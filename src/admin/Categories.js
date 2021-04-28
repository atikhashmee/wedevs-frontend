import React, { createRef, useEffect, useState } from 'react';
import {Modal} from 'bootstrap'
let baseUrl = process.env.REACT_APP_.BASE_URL;
const Categories = () => {
    let modalRef = createRef();
    const [products, setproducts] = useState([]);
    const [currentProduct, setcurrentProduct] = useState({});
    const [isEdit, setisEdit] = useState(false);
    const [modalObj, setmodalObj] = useState(null);
    const [successMesg, setsuccessMesg] = useState("");

    function loadEditable(proudct) {
        setcurrentProduct(proudct)
        showModal();
        setisEdit(true);
    }

    function deleteData(proudct) {
        if (window.confirm('Are you sure?')) {
            let formD = new FormData()
            formD.append('id', proudct.id)
            fetch(baseUrl+'categories/delete', {
                method: 'POST',
                body: formD
             }).then(res=>res.json())
             .then(res=>{
                 if (res.status) {
                    setsuccessMesg('Category has been deleted')
                    getProductData();
                 }
             })
        }
    }
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
        fetch(baseUrl+'categories')
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
                    <h5 className="modal-title" id="exampleModalLabel">Category Add</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                   <ProductForm isEdit={isEdit} 
                   setsuccessMesg={setsuccessMesg} getProductData={getProductData} hideModal={hideModal} currentProduct={currentProduct}  />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <div><h5>Category</h5></div>
                <div>
                    <button type="button" onClick={()=>{showModal()}} className="btn btn-success">Create New</button>
                </div>
            </div>
            <div className="card-body">
                {successMesg !== "" && <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> {successMesg}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                <ProductLists products={products} deleteData={deleteData}  loadEditable={loadEditable} />
            </div>
        </div>
    </> );
}

const ProductForm = ({getProductData, setsuccessMesg, hideModal, currentProduct, isEdit}) => {
    const [productForm, setproductForm] = useState({
        name: '',
    });
    function resetform() {
        setproductForm({
            name: '',
        })  
    }
    useEffect(() => {
        if (!isEdit) {
            resetform();
        }
    }, [isEdit])
    
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
        let urrl = baseUrl+'categories/store';
        if (isEdit) {
            formD.append('id', currentProduct.id)
            urrl = baseUrl+'categories/update';
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
                if (isEdit) {
                    setsuccessMesg('Category has updated')
                } else {
                    setsuccessMesg('Category has saved')
                }
            } else {
              errors.push(res.data)
              setErr(errors);
              console.log(errors)
            }
        })
    }
    return (
        <form onSubmit={(evt)=>{submitForm(evt)}} method="POST" >
            <div className="form-group">
                <label htmlFor="product_name" className="form-label">Category Name</label>
                <input type="text" onChange={(obj)=>handleInput(obj)} value={productForm.name} className="form-control" name="name" id="product_name" />
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
                        <th>Action</th>
                    </tr>
                </thead>
                 <tbody>
                     {products.map((item,idd)=>(
                         <tr key={idd}>
                             <td>{item.id}</td>
                             <td>{item.name}</td>
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
 
export default Categories;