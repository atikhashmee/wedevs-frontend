import React, { createRef, useEffect, useState } from 'react';
import {Modal} from 'bootstrap'
let baseUrl = process.env.REACT_APP_.BASE_URL;
const Products = () => {
    let modalRef = createRef();
    const [products, setproducts] = useState([]);
    const [currentProduct, setcurrentProduct] = useState({});
    const [isEdit, setisEdit] = useState(false);
    const [modalObj, setmodalObj] = useState(null);

    function loadEditable(proudct) {
        setcurrentProduct(proudct)
        showModal();
        setisEdit(true);
    }

    function deleteData(proudct) {
        if (window.confirm('Are you sure?')) {
            let formD = new FormData()
            formD.append('id', proudct.id)
            fetch(baseUrl+'products/delete', {
                method: 'POST',
                body: formD
             }).then(res=>res.json())
             .then(res=>{
                 if (res.status) {
                    getProductData();
                 }
             })
        }
    }

    var testModal;
    function showModal() {
        var myModalEl = modalRef.current
        var myModal = new Modal(myModalEl, {});
        myModal.show();
        setmodalObj(myModal);
    }

    function hideModal() {
        if (modalObj !== null ) {
            modalObj.hide();
            setisEdit(false);
        }
    }
    useEffect(()=>{
        getProductData();
        var myModalEl = document.getElementById('exampleModal')
        myModalEl.addEventListener('hidden.bs.modal', function (event) {
            setisEdit(false);
            setcurrentProduct({})
        })
    },[])

    function getProductData() {
        fetch(baseUrl+'products/index')
        .then(res=>res.json())
        .then(res=>{
            if (res.status) {
                setproducts(res.data);
            }
        })
    }
    return ( <>
        <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Product Add</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                   <ProductForm isEdit={isEdit} getProductData={getProductData} hideModal={hideModal} currentProduct={currentProduct}  />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <div><h5>Product Management</h5></div>
                <div>
                    <button type="button" onClick={()=>{showModal()}} className="btn btn-success">Create New</button>
                </div>
            </div>
            <div className="card-body">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> You should check in on some of those fields below.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <ProductLists products={products} deleteData={deleteData}  loadEditable={loadEditable} />
            </div>
        </div>
    </> );
}

const ProductForm = ({getProductData, hideModal, currentProduct, isEdit}) => {
    const [categories, setcategories] = useState([]);
    const [productForm, setproductForm] = useState({
        name: '',
        description: '',
        sku: '',
        category_id: '',
        price: '',
        image: null
    });
    function resetform() {
        setproductForm({
            name: '',
            description: '',
            sku: '',
            category_id: '',
            price: '',
            image: null
        })  
    }
    useEffect(() => {
        if (!isEdit) {
            resetform();
        }
    }, [isEdit])

    useEffect(()=>{
        getFetchData();
    }, [])

    function getFetchData() {
        fetch(baseUrl+'categories')
        .then(res=>res.json())
        .then(res=>{
            if (res.status) {
                setcategories(res.data);
            }
        })
    }
    
    const [err, setErr] = useState([]);
    function handleInput(obj) {
        setproductForm({...productForm,  [obj.currentTarget.name]: obj.currentTarget.value});
    }

    useEffect(()=>{
        let proObj = {...productForm};
        if (currentProduct && 'name' in currentProduct) {
            proObj.name =  currentProduct.name;
        }

        if (currentProduct && 'description' in currentProduct) {
            proObj.description =  currentProduct.description;
        }

        if (currentProduct && 'sku' in currentProduct) {
            proObj.sku =  currentProduct.sku;
        }

        if (currentProduct && 'category_id' in currentProduct) {
            proObj.category_id =  currentProduct.category_id;
        }

        if (currentProduct && 'price' in currentProduct) {
            proObj.price =  currentProduct.price;
        }

        if (currentProduct && 'image' in currentProduct) {
            proObj.image =  currentProduct.image;
        }
        setproductForm(proObj);
    }, [currentProduct])

    function submitForm(evt) {
        evt.preventDefault()
        setErr([]);
        let errors = [];
        if (productForm.name == '') {
          errors.push('Username can not be empty')
        }
        
        if (productForm.sku == '') {
          errors.push('sku can not be empty')
        }
        if (productForm.category_id == '') {
          errors.push('category_id can not be empty')
        }
        setErr(errors);
        if (errors.length > 0) return;
        let formD = new FormData;
        for (const itemKey in productForm) {
            formD.append(itemKey, productForm[itemKey])
        }
        let urrl = baseUrl+'products/store';
        if (isEdit) {
            formD.append('id', currentProduct.id)
            urrl = baseUrl+'products/update';
        }
        fetch(urrl, {
           method: 'POST',
           body: formD
        }).then(res=>res.json())
        .then(res=>{
            if (res.status) {
                getProductData()
                hideModal();
                resetform();
            } else {
              errors.push(res.data)
              setErr(errors);
              console.log(errors)
            }
        })
    }
    return (
        <form onSubmit={(evt)=>{submitForm(evt)}} method="POST" >
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="product_name" className="form-label">Product Name</label>
                                    <input type="text" onChange={(obj)=>handleInput(obj)} value={productForm.name} className="form-control" name="name" id="product_name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="sku" className="form-label">SKU</label>
                                    <input type="text" onChange={(obj)=>handleInput(obj)} value={productForm.sku} className="form-control" name="sku" id="sku" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea  onChange={(obj)=>handleInput(obj)} className="form-control" value={productForm.description} name="description" id="description"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category_id" className="form-label">Category</label>
                            <select onChange={(obj)=>handleInput(obj)} defaultValue={productForm.category_id} className="form-select" id="category_id" name="category_id">
                                <option value="">Select a category</option>
                                {categories.length > 0 && categories.map((ite,ind)=>(
                                    <option key={ind} value={ite.id}>{ite.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="text" onChange={(obj)=>handleInput(obj)} value={productForm.price} className="form-control" name="price" id="price" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="formFileLg" className="form-label">Product Image</label>
                            <input className="form-control form-control-lg" onChange={(obj)=>handleInput(obj)} id="formFileLg" name="image" type="file" />
                        </div>
                        <button type="submit" className="btn btn-primary">Store</button>
                    </form>
       
    );
}

const ProductLists = ({products, loadEditable, deleteData}) =>{
        

        return (
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                 <tbody>
                     {products.map((item,idd)=>(
                         <tr key={idd}>
                             <td>{item.id}</td>
                             <td>{item.name}</td>
                             <td>{item.description}</td>
                             <td>{item.image}</td>
                             <td>{item.price}</td>
                             <td>
                                 <button type="button" onClick={()=>{loadEditable(item)}} className="btn btn-sm btn-warning">Edit</button>
                                 <button type="button" onClick={()=>{deleteData(item)}} className="btn btn-sm btn-danger">Delete</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
          </table>
        );
}
 
export default Products;