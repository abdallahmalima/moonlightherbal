/* eslint-disable @next/next/no-img-element */

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';
import { Demo } from '../../../types/types';
import { addDoc, collection, doc, updateDoc,onSnapshot, deleteDoc, where, query } from "firebase/firestore";
import {FIRESTORE_DB,FIREBASE_AUTH}  from "../../../firebase.config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const Product = () => {
    let emptyProduct: Demo.Testimonial = {
        id: '',
        name: '',
        description: '',
        profession: '',
        image: '',
    };
    const [productImage, setProductImage] = useState<File | null>(null);
    const [products, setProducts] = useState<Demo.Post[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState<Demo.Post>(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<Demo.Post[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Demo.Post[]>>(null);
    const fileUploadRef = useRef<FileUpload>(null);
    

    useEffect(() => {
        const unsubscribe=loadProducts()

          return ()=>{unsubscribe()}
    }, []);

    const loadProducts=()=>{
        const createdById = FIREBASE_AUTH.currentUser?.uid || ''
        console.log(createdById)
        const productRef=collection(FIRESTORE_DB,'testimonials')
        const subscriber=onSnapshot(productRef,{
            next:(snapshot)=>{
              const products:any=[];
              snapshot.docs.forEach((doc)=>{
                products.push({
                  id:doc.id,
                  ...doc.data()
                })
                
              })
              
                setProducts(products)
            }
          })

          return subscriber
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onUploadHandler = (event:any) => {
        const file = event.files[0];
         setProductImage(file);   
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded '+file.name, life: 3000 });

    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const handleSaveProduct=async (downloadURL:string)=>{
        if (product.name?.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
    
                 const ref=doc(FIRESTORE_DB,`testimonials/${product.id}`)
                 await updateDoc(ref,{
                    name:_product.name,
                    description:_product.description,
                    profession:_product.profession,
                    image:downloadURL,
                 })
                 loadProducts()
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                if(downloadURL.length>0){
                    const createdById=FIREBASE_AUTH.currentUser?.uid || ''
                    const doc=await addDoc(collection(FIRESTORE_DB,'testimonials'),{
                        name:_product.name,
                        description:_product.description,
                        profession:_product.profession,
                        image:downloadURL,
                     })
                     loadProducts()
                     toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
            setProductImage(null);
        }


    }

    const saveWithImage=async(handleSave:(downloadURL:string)=>void)=>{
            const storage = getStorage();
            const imageExtension = productImage?.name.split('.').pop();
            const imagePath = product.id ? product.image : `images/${uuidv4()}.${imageExtension}`; 
            const storageRef = ref(storage, imagePath);
            if(productImage){
            const uploadTask = uploadBytesResumable(storageRef, productImage);
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                // Handle unsuccessful uploads
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    handleSave(downloadURL);

                });
              }
            );
            }
                               
    }

    const saveProduct =  async() => {
        setSubmitted(true);
        if(productImage){
           saveWithImage(handleSaveProduct)
        }else{
            handleSaveProduct(product.image ?? '') 
        }
        


     
    };

    const editProduct = (product: Demo.Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Demo.Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        
        const reff=doc(FIRESTORE_DB,`testimonials/${product.id}`)
        deleteDoc(reff)

    const storage = getStorage();
    const storageRef = ref(storage, product.image);
    deleteObject(storageRef);

        loadProducts()
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

   

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts?.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        const _product = { ...product, category: e.value };
        setProduct(_product);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        const _product = { ...product,[name]: val };
        setProduct(_product);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        const _product = { ...product,[name]: val };
        setProduct(_product);

    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };



    const codeBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const titleBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={rowData.image} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    };

    const descriptionBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };


    const actionBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value as Demo.Product[])}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="name" header="name" sortable body={titleBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" body={descriptionBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Title is required.</small>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="profession">Profession</label>
                            <InputText id="profession" value={product.profession} onChange={(e) => onInputChange(e, 'profession')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.profession })} />
                            {submitted && !product.profession && <small className="p-invalid">Title is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label htmlFor="image">Image</label>
                            <FileUpload 
                                        ref={fileUploadRef}
                                        mode="basic"   
                                        onSelect={onUploadHandler} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Product;
