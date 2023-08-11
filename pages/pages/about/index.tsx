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
    let emptyProduct: Demo.Post = {
        id: '',
        title: '',
        image: '',
    };
    const [productImage, setProductImage] = useState<File | null>(null);
    const [productImage1, setProductImage1] = useState<File | null>(null);
    const [productImage2, setProductImage2] = useState<File | null>(null);
    const [productImage3, setProductImage3] = useState<File | null>(null);
    const [productImage4, setProductImage4] = useState<File | null>(null);
    const [secondProductImage, setSecondProductImage] = useState<File | null>(null);
    const [postImageOne,setPostImageOne]=useState(undefined)
    const [image1,setImage1]=useState(undefined)
    const [image2,setImage2]=useState(undefined)
    const [image3,setImage3]=useState(undefined)
    const [image4,setImage4]=useState(undefined)
    const [postImageTwo,setPostImageTwo]=useState(undefined)
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
    const fileUploadRef1 = useRef<FileUpload>(null);
    const fileUploadRef2 = useRef<FileUpload>(null);
    const fileUploadRef3 = useRef<FileUpload>(null);
    const fileUploadRef4 = useRef<FileUpload>(null);
    const fileUploadRef = useRef<FileUpload>(null);
    const secondFileUploadRef = useRef<FileUpload>(null);
    
    useEffect(()=>{
        if(postImageOne &&
           postImageTwo && 
           image1 &&
           image2 &&
           image3 &&
           image4
           ){

            handleSaveProduct()

        }
          
    },[postImageOne,postImageTwo,image1,image2,image3,image4])

    useEffect(() => {
        const unsubscribe=loadProducts()

          return ()=>{unsubscribe()}
    }, []);

    const loadProducts=()=>{
        const createdById = FIREBASE_AUTH.currentUser?.uid || ''
        console.log(createdById)
        const productRef=collection(FIRESTORE_DB,'about')
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


    };
    const onUploadHandler1 = (event:any) => {
        const file = event.files[0];
         setProductImage1(file);   


    };
    const onUploadHandler2 = (event:any) => {
        const file = event.files[0];
         setProductImage2(file);   


    };
    const onUploadHandler3 = (event:any) => {
        const file = event.files[0];
         setProductImage3(file);   


    };

    const onUploadHandler4 = (event:any) => {
        const file = event.files[0];
         setProductImage4(file);   


    };

    const onUploadSecondHandler = (event:any) => {
        const file = event.files[0];
         setSecondProductImage(file);   

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

    const updateImage=async (key,value)=>{
        const ref=doc(FIRESTORE_DB,`about/${product.id}`)
        await updateDoc(ref,{
           [key]:value,
        })
    }

    const uploadImage=(key,file:any,_imagePath:any)=>{
        const storage = getStorage();
        const imageExtension = productImage?.name.split('.').pop();
        const imagePath = _imagePath
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);
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
                updateImage(key,downloadURL);
                 
            });
          }
        );

    }

    const handleUpdateProduct=async ()=>{
       if (product.title?.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
    
                 const ref=doc(FIRESTORE_DB,`about/${product.id}`)
                 await updateDoc(ref,{
                    title:_product.title,
                    description:_product.description,
                    title_second:_product.title_second,
                    description_second:_product.description_second,
                 })

                 if(productImage){
                    uploadImage('post_image1',productImage,_product.post_image1)
                 }
                 if(secondProductImage){
                    uploadImage('post_image2',secondProductImage,_product.post_image2)
                 }
                 if(productImage1){
                    uploadImage('image1',productImage1,_product.image1)
                 }
                 if(productImage2){
                    uploadImage('image2',productImage2,_product.image2)
                 }
                 if(productImage3){
                    uploadImage('image3',productImage3,_product.image3)
                 }
                 
                 if(productImage4){
                    uploadImage('image4',productImage4,_product.image4)
                 }

                          setPostImageOne(undefined)
                          setPostImageTwo(undefined)
                          setImage1(undefined)
                          setImage2(undefined)
                          setImage3(undefined)
                          setImage4(undefined)
                          loadProducts()
                         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });


            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
            setProductImage(null);
            setSecondProductImage(null);
            setProductImage1(null);
            setProductImage2(null);
            setProductImage3(null);
            setProductImage4(null);
                 
    }
       }
    }
    const handleSaveProduct=async ()=>{
     if(product.title?.trim()){
        let _products = [...products];
        let _product = { ...product };
        const createdById=FIREBASE_AUTH.currentUser?.uid || ''
                    const doc=await addDoc(collection(FIRESTORE_DB,'about'),{
                        title:_product.title,
                        description:_product.description,
                        title_second:_product.title_second,
                        description_second:_product.description_second,
                        post_image1: postImageOne,
                        post_image2:postImageTwo,
                        image1:image1,
                        image2:image2,
                        image3:image3,
                        image4:image4,
                        createdBy:createdById
                     })
                       
                     setPostImageOne(undefined)
                     setPostImageTwo(undefined)
                     setImage1(undefined)
                     setImage2(undefined)
                     setImage3(undefined)
                     setImage4(undefined)
                     loadProducts()
                     toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

                     setProducts(_products);
                     setProductDialog(false);
                     setProduct(emptyProduct);
                     setProductImage(null);
                     setSecondProductImage(null);
                     setProductImage1(null);
                     setProductImage2(null);
                     setProductImage3(null);
                     setProductImage4(null);
     }

       


    }


    const saveWithImage=async()=>{
        if(productImage && secondProductImage && productImage1 && productImage2 && productImage3 && productImage4){
            const storage = getStorage();
            const imageExtension = productImage?.name.split('.').pop();
            const imagePath = product.id ? product.post_image1 : `images/${uuidv4()}.${imageExtension}`; 
            const storageRef = ref(storage, imagePath);


            const imageExtension1 = productImage1?.name.split('.').pop();
            const imagePath1 = product.id ? product.image1 : `images/${uuidv4()}.${imageExtension1}`; 
            const storageRef1 = ref(storage, imagePath1);

            const imageExtension2 = productImage2?.name.split('.').pop();
            const imagePath2 = product.id ? product.image2 : `images/${uuidv4()}.${imageExtension2}`; 
            const storageRef2 = ref(storage, imagePath2);

            const imageExtension3 = productImage3?.name.split('.').pop();
            const imagePath3 = product.id ? product.image3 : `images/${uuidv4()}.${imageExtension3}`; 
            const storageRef3 = ref(storage, imagePath3);

            const imageExtension4 = productImage4?.name.split('.').pop();
            const imagePath4 = product.id ? product.image4 : `images/${uuidv4()}.${imageExtension4}`; 
            const storageRef4 = ref(storage, imagePath4);

            const imageExtension_second = secondProductImage?.name.split('.').pop();
            const imagePath_second = product.id ? product.post_image2 : `images/${uuidv4()}.${imageExtension_second}`; 
            const storageRef_second = ref(storage, imagePath_second);
            
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
                    setPostImageOne(downloadURL);
                     
                });
              }
            );

            const uploadTask1 = uploadBytesResumable(storageRef1, productImage1);
            uploadTask1.on('state_changed', 
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
                getDownloadURL(uploadTask1.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    setImage1(downloadURL);
                     
                });
              }
            );

            const uploadTask2 = uploadBytesResumable(storageRef2, productImage2);
            uploadTask2.on('state_changed', 
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
                getDownloadURL(uploadTask2.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    setImage2(downloadURL);
                     
                });
              }
            );

            const uploadTask3 = uploadBytesResumable(storageRef3, productImage3);
            uploadTask3.on('state_changed', 
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
                getDownloadURL(uploadTask3.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    setImage3(downloadURL);
                     
                });
              }
            );

            const uploadTask4 = uploadBytesResumable(storageRef4, productImage4);
            uploadTask4.on('state_changed', 
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
                getDownloadURL(uploadTask4.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    setImage4(downloadURL);
                     
                });
              }
            );

            
            const uploadTaskSecond = uploadBytesResumable(storageRef, secondProductImage);
            uploadTaskSecond.on('state_changed', 
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
                getDownloadURL(uploadTaskSecond.snapshot.ref).then(async (downloadURL) => {
                    // Set the UID of the currently authenticated user as "createdBy"
                    setPostImageTwo(downloadURL);
                });
              }
            );
        }
                               
    }

    const saveProduct =  async() => {
        setSubmitted(true);

        if (product.title?.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                handleUpdateProduct();
            }else{
                saveWithImage()
            }
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
        
        const reff=doc(FIRESTORE_DB,`about/${product.id}`)
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
                  {products.length<1 &&  (<Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    )
                   }
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
                <img src={rowData.image1} alt={rowData.image1} className="shadow-2" width="100" />
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
            <h5 className="m-0">Manage About Page</h5>
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
                        <Column field="title" header="title" sortable body={titleBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="description" body={descriptionBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image1 && <img src={`${product.image1}`} alt={product.image1} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        {product.image2 && <img src={`${product.image2}`} alt={product.image2} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        {product.image3 && <img src={`${product.image3}`} alt={product.image3} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        {product.image4 && <img src={`${product.image4}`} alt={product.image4} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        {product.post_image1 && <img src={`${product.post_image1}`} alt={product.post_image1} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        {product.post_image2 && <img src={`${product.post_image2}`} alt={product.post_image2} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                         
                        <div className="field">
                            <label htmlFor="image"> Image One</label>
                            <FileUpload 
                                        ref={fileUploadRef1}
                                        mode="basic"   
                                        onSelect={onUploadHandler1} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>
                        <div className="field">
                            <label htmlFor="image"> Image Two</label>
                            <FileUpload 
                                        ref={fileUploadRef2}
                                        mode="basic"   
                                        onSelect={onUploadHandler2} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>
                        <div className="field">
                            <label htmlFor="image"> Image Three</label>
                            <FileUpload 
                                        ref={fileUploadRef3}
                                        mode="basic"   
                                        onSelect={onUploadHandler3} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>
                        <div className="field">
                            <label htmlFor="image"> Image Four</label>
                            <FileUpload 
                                        ref={fileUploadRef4}
                                        mode="basic"   
                                        onSelect={onUploadHandler4} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>



                        <div className="field">
                            <label htmlFor="title">Fist Title</label>
                            <InputText id="title" value={product.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.title })} />
                            {submitted && !product.title && <small className="p-invalid">Title is required.</small>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="description">Fist Description</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label htmlFor="image">Fist Image</label>
                            <FileUpload 
                                        ref={fileUploadRef}
                                        mode="basic"   
                                        onSelect={onUploadHandler} 
                                        accept="image/*" 
                                        chooseLabel='Select Image'
                                        maxFileSize={1000000}
                                        />
                                       
                        </div>
                        <div className="field">
                            <label htmlFor="second_title">Second Title</label>
                            <InputText id="second_title" value={product.title_second} onChange={(e) => onInputChange(e, 'title_second')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.title_second })} />
                            {submitted && !product.title_second && <small className="p-invalid">Second Title is required.</small>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="description_second">Second Description</label>
                            <InputTextarea id="description_second" value={product.description_second} onChange={(e) => onInputChange(e, 'description_second')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label htmlFor="second_image">Second Image</label>
                            <FileUpload 
                                        ref={secondFileUploadRef}
                                        mode="basic"   
                                        onSelect={onUploadSecondHandler} 
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
