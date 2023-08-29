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
import revalidate from '../../../lib/revalidate';
import { ProgressSpinner } from 'primereact/progressspinner';




const Product = () => {
    let emptyProduct: Demo.Product = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const [productImage, setProductImage] = useState<File | null>(null);
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState<Demo.Product>(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Demo.Product[]>>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    const [usageInputFields ,setUsageInputFields]=useState<any>([])
    const [diseaseInputFields ,setDiseaseInputFields]=useState<any>([])
    const [isLoading,setIsLoading]=useState(false)
    const [isLoadingSubmit,setIsLoadingSubmit]=useState(false)


        const addUsageInputField = ()=>{
            setUsageInputFields([...usageInputFields, {
                usage:'',
            } ])

            console.log(usageInputFields)
          
        }

        const removeUsageInputField = (index:number)=>{
            const rows = [...usageInputFields];
            rows.splice(index, 1);
            setUsageInputFields(rows);
       }

       const handleUsageInputFieldChange = (index:number, evnt:any)=>{
        const { name, value } = evnt.target;
        const list:any = [...usageInputFields];
       list[index].usage=value
        setUsageInputFields(list);
    }


    const addDiseaseInputField = ()=>{
        setDiseaseInputFields([...diseaseInputFields, {
            disease:'',
        } ])

      
    }

    const removeDiseaseInputField = (index:number)=>{
        const rows = [...diseaseInputFields];
        rows.splice(index, 1);
        setDiseaseInputFields(rows);
   }

   const handleDiseaseInputFieldChange = (index:number, evnt:any)=>{
    const { name, value } = evnt.target;
    const list:any = [...diseaseInputFields];
   list[index].disease=value
    setDiseaseInputFields(list);
}


    useEffect(() => {
        const unsubscribe=loadProducts()

          return ()=>{unsubscribe()}
    }, []);

    const loadProducts=()=>{
        setIsLoading(true)
        const productRef=collection(FIRESTORE_DB,'products')
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
        return value.toLocaleString('en-US', { style: 'currency', currency: 'TSH' });
    };

    const onUploadHandler = (event:any) => {
        const file = event.files[0];
         setProductImage(file);   

    };

    const openNew = () => {
        setDiseaseInputFields([])
        setUsageInputFields([])
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
        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                setIsLoadingSubmit(true)
                 const ref=doc(FIRESTORE_DB,`products/${product.id}`)
                 await updateDoc(ref,{
                    name:_product.name,
                    price:_product.price,
                    description:_product.description,
                    image:downloadURL,
                    usages:usageInputFields,
                    diseases:diseaseInputFields,
                 })
                loadProducts()
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                 console.log(product.id)
                
               


            } else {
                if(downloadURL.length>0){
            
                    const doc=await addDoc(collection(FIRESTORE_DB,'products'),{
                        name:_product.name,
                        description:_product.description,
                        price:_product.price,
                        image:downloadURL,
                        usages:usageInputFields,
                        diseases:diseaseInputFields,
                     })
                     loadProducts()
                     toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    
                     
                     
                    }
                
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
            setProductImage(null);
            setIsLoadingSubmit(false);
        }


    }

    const saveWithImage=async(handleSave:(downloadURL:string)=>void)=>{
             setIsLoadingSubmit(true)
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
        setUsageInputFields(product.usages)
        setDiseaseInputFields(product.diseases)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Demo.Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        
        const reff=doc(FIRESTORE_DB,`products/${product.id}`)
        deleteDoc(reff)

    const storage = getStorage();
    const storageRef = ref(storage, product.image);
    deleteObject(storageRef);

        loadProducts()
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
 
        revalidate('products',product.id)
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
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

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

    const nameBodyTemplate = (rowData: Demo.Product) => {
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

    const priceBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price as number)}
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

    const descriptionBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
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
    
    const isFormFilled=()=>{

        if(product.id) {
         return product.name?.length>0  &&
                product.description?.length>0
        }

        return product.name?.length>0  &&
        product.description?.length>0 &&
        productImage!=null 

      }

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label={!isLoadingSubmit? `Save` :<ProgressSpinner style={{width: '29px', height: '29px'}}/>} icon={!isLoadingSubmit && `pi pi-check`} text onClick={saveProduct}  disabled={!isFormFilled() || isLoadingSubmit}/>
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
                 <span className="p-column-title">Name</span>
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

    const priceSkeletonBodyTemplate = (rowData: Demo.Post) => {
        return (
            <>
                 <span className="p-column-title">Price</span>
                 <div className="flex">
                <div style={{ flex: '1' }}>
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
                        value={[{},{},{},{},{},{},{},{},{}]}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column header="Image" body={imageSkeletonBodyTemplate}></Column>
                        <Column field="title" header="title" sortable body={titleSkeletonBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" sortable body={descriptionSkeletonBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="price" header="price" sortable body={priceSkeletonBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
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
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" body={descriptionBodyTemplate} sortable></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>}

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
    
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="Tsh" locale="en-US" />
                            </div>
                           
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
                                         {productImage ? (<img src={`${URL.createObjectURL(productImage)}`} alt={URL.createObjectURL(productImage)} width="150" className="mt-1 mb-5 block shadow-2" />):(
                                            product.image && <img src={`${product.image}`} alt={product.image} width="150" className="mt-1 mb-5 block shadow-2" />
                                         )}
                                       
                        </div>

                        <div className="field">
                            <label htmlFor="name">Diseases</label>
                        {diseaseInputFields.map((data, index)=>{
                        
                          const {disease}= data;
                          return(<div key={disease} className="field">
                            <div className="flex gap-3">
                            <InputText id="disease" 
                                     onChange={(evnt)=>handleDiseaseInputFieldChange(index, evnt)} 
                                     value={disease} required autoFocus 
                                     className={classNames({ 'p-invalid': submitted && !disease })} />
                            <Button icon="pi pi-times" rounded outlined severity="danger" onClick={()=>{removeDiseaseInputField(index)}} />
                            </div>
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                          
                           </div> )
                          })}
                             <Button className='w-3' label="Add" icon="pi pi-plus" text onClick={addDiseaseInputField} />
                           </div>

                        <div className="field">
                            <label htmlFor="name">Usage</label>
                        {usageInputFields.map((data, index)=>{
                        
                          const {usage}= data;
                          return(<div key={usage} className="field">
                            <div className="flex gap-3">
                            <InputText id="usage" 
                                     onChange={(evnt)=>handleUsageInputFieldChange(index, evnt)} 
                                     value={usage} required autoFocus 
                                     className={classNames({ 'p-invalid': submitted && !usage })} />
                            <Button icon="pi pi-times" rounded outlined severity="danger" onClick={()=>{removeUsageInputField(index)}} />
                            </div>
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                          
                           </div> )
                          })}
                             <Button className='w-3' label="Add" icon="pi pi-plus" text onClick={addUsageInputField} />
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
