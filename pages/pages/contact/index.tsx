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
import { Skeleton } from 'primereact/skeleton';


const Product = () => {
    let emptyProduct: Demo.Post = {
        id: '',
        title: '',
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
    const [isLoading,setIsLoading]=useState(false)
    

    useEffect(() => {
        const unsubscribe=loadProducts()

          return ()=>{unsubscribe()}
    }, []);

    const loadProducts=()=>{
        setIsLoading(true)
        const createdById = FIREBASE_AUTH.currentUser?.uid || ''
        console.log(createdById)
        const productRef=collection(FIRESTORE_DB,'contact')
        const subscriber=onSnapshot(productRef,{
            next:(snapshot)=>{
              const products:any=[];
              snapshot.docs.forEach((doc)=>{
                products.push({
                  id:doc.id,
                  ...doc.data()
                })
                
              })
                 setIsLoading(false)
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
        if (product.title?.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
    
                 const ref=doc(FIRESTORE_DB,`contact/${product.id}`)
                 await updateDoc(ref,{
                    title:_product.title,
                    description:_product.description,
                    contact1:_product.contact1,
                    contact2:_product.contact2,
                    email1:_product.email1,
                    email2:_product.email2,
                    street:_product.street,
                    region:_product.region,
                 })
                 loadProducts()
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Contact Updated', life: 3000 });
            } else {
                
                    const createdById=FIREBASE_AUTH.currentUser?.uid || ''
                    const doc=await addDoc(collection(FIRESTORE_DB,'contact'),{
                        title:_product.title,
                        description:_product.description,
                        contact1:_product.contact1,
                        contact2:_product.contact2,
                        email1:_product.email1,
                        email2:_product.email2,
                        street:_product.street,
                        region:_product.region,
                     })
                     loadProducts()
                     toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Contact Created', life: 3000 });
                
                
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
        
        const reff=doc(FIRESTORE_DB,`contact/${product.id}`)
        deleteDoc(reff)

    const storage = getStorage();
    const storageRef = ref(storage, product.image);
    deleteObject(storageRef);

        loadProducts()
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Contact Deleted', life: 3000 });
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
                  {products.length<1 && <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />}
                  
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
                <span className="p-column-title">Title</span>
                {rowData.title}
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
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Contact Information</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const isFormFilled=()=>{

        
        return product.title?.length>0  &&
        product.contact1?.length>0  &&
        product.contact2?.length>0  &&
        product.email1?.length>0  &&
        product.email2?.length>0  &&
        product.street?.length>0  &&
        product.region?.length>0  &&
        product.description?.length>0 
       

      }

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct}  disabled={!isFormFilled()}/>
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
    const imageSkeletonBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <Skeleton width="7rem" height="4rem"></Skeleton>
            </>
        );
    };
    const titleSkeletonBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                 <span className="p-column-title">Title</span>
                 <div className="flex">
                <div style={{ flex: '1' }}>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
            </>
        );
    };

    const descriptionSkeletonBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                 <span className="p-column-title">Description</span>
                 <div className="flex">
                <div style={{ flex: '1' }}>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
            </>
        );
    };

    const actionSkeletonBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
               <div className='flex'>
                <Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton>
                </div>
            </>
        );
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    {isLoading && <DataTable
                        value={[{}]}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column header="Image" body={imageSkeletonBodyTemplate}></Column>
                        <Column field="title" header="title" sortable body={titleSkeletonBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" sortable body={descriptionSkeletonBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionSkeletonBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>}  
                   
                    {!isLoading && <DataTable
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
                        <Column field="title" header="title" sortable body={titleBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" body={descriptionBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>}

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Contact Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <InputText id="title" value={product.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.title })} />
                            {submitted && !product.title && <small className="p-invalid">Title is required.</small>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label htmlFor="contact1">Contact1</label>
                            <InputText id="contact1" value={product.contact1} onChange={(e) => onInputChange(e, 'contact1')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.contact1 })} />
                            {submitted && !product.contact1 && <small className="p-invalid">Contact1 is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="contact2">Contact2</label>
                            <InputText id="contact2" value={product.contact2} onChange={(e) => onInputChange(e, 'contact2')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.contact2 })} />
                            {submitted && !product.contact2 && <small className="p-invalid">Contact1 is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email1</label>
                            <InputText id="email1" value={product.email1} onChange={(e) => onInputChange(e, 'email1')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.email1 })} />
                            {submitted && !product.email1 && <small className="p-invalid">Email1 is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email2">email2</label>
                            <InputText id="email2" value={product.email2} onChange={(e) => onInputChange(e, 'email2')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.email2 })} />
                            {submitted && !product.email2 && <small className="p-invalid">email2 is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="street">Street</label>
                            <InputText id="street" value={product.street} onChange={(e) => onInputChange(e, 'street')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.street })} />
                            {submitted && !product.street && <small className="p-invalid">Street is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="region">Region</label>
                            <InputText id="region" value={product.region} onChange={(e) => onInputChange(e, 'region')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.region })} />
                            {submitted && !product.region && <small className="p-invalid">Region is required.</small>}
                        </div>

    
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.title}</b>?
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
