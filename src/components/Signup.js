import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter, Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
export default class Example extends React.Component {

  render() {
    
    return (
    <Container className="sm-container">
        <div className="content">
            <Row>
                <Col xs="12">
                    <div className="d-flex justify-content-between">
                        <label className='signup'>Sign Up</label>
                        
                        {this.state.customer ? (
                            <div className="d-flex justify-content-between w-58">
                                <Button color="c-black" onClick={this.toggleForm}>Customer</Button>
                                <Button color="c-white" onClick={this.toggleForm}>Vendor</Button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-between w-58">
                                <Button color="c-white" onClick={this.toggleForm1}>Customer</Button>
                                <Button color="c-black" onClick={this.toggleForm1}>Vendor</Button>
                            </div>
                        )}   
                    </div>
                    <hr className="line"></hr>
                </Col>
            </Row>
            <div>
                {this.state.customer ? (
                    <AvForm onValidSubmit={this.handleValidSubmit} name="customer" ref={(el) => this.myFormRef = el}>
                        <AvField name="email" label="Email Address" type="email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")} required />
                        <AvField name="firstName" label="First Name (Optional)" type="text" value={this.state.fields["firstName"]} onChange={this.handleChange.bind(this, "firstName")} />
                        <AvField name="lastName" label="Last Name (Optional)" type="text" value={this.state.fields["lastName"]} onChange={this.handleChange.bind(this, "lastName")}/>
                    
                        <Button color="c-black" className="float-r">Submit</Button>
                    </AvForm>
                ) : (
                    <AvForm onValidSubmit={this.handleValidSubmit1} name="vendor" ref={(el) => this.myFormRef1 = el}>
                        <AvField name="email1" label="Email Address" type="email" value={this.state.fields1["email1"]} onChange={this.handleChange.bind(this, "email1")} required />
                        <AvField name="companyName" label="Company Name" type="text" value={this.state.fields1["companyName"]} onChange={this.handleChange.bind(this, "companyName")} required/>
                        <AvField name="productName" label="Product Name" type="text" pattern="[A-Za-z0-9]" value={this.state.fields1["productName"]} onChange={this.handleChange.bind(this, "productName")} required/>
                        <label name="productPriceLabel" className="productPriceLabel">Product Price</label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <AvField name="productPrice" className="product-price" type="number" min="0" id="productPrice" value={this.state.fields1["productPrice"]} onChange={this.handleChange.bind(this, "productPrice")} required/>
                        </InputGroup>
                        <AvField name="productQuantity" label="Product Quantity" type="number" min="0" value={this.state.fields1["productQuantity"]} onChange={this.handleChange.bind(this, "productQuantity")} required/>
                        <Button color="c-black" className="float-r">Submit</Button>
                    </AvForm>
                )}
                
                <Modal isOpen={this.state.validSubmit !== false || this.state.validSubmit1 !== false} toggle={this.closeModal}>
                {this.state.customer ? (
                    <ModalHeader toggle={this.closeModal} className="m-header">Customer Created!</ModalHeader>
                ) : (
                    <ModalHeader toggle={this.closeModal} className="m-header">Vender Created!</ModalHeader>
                )}
                    <ModalFooter className="m-footer">
                        <Button color="c-black" onClick={this.closeModal}>Done</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
      </Container>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
        customer: true,
        validSubmit: false,
        fields: {
            email: '',
            firstName: '',
            lastName: ''
        },
        errors: {},
        validSubmit1: false,
        fields1: {
            email1: '',
            companyName: '',
            productName: '',
            productPrice: '',
            productQuantity: ''
        },
        errors1: {
            email1: '',
            companyName: '',
            productName: '',
            productPrice: '',
            productQuantity: ''
        },
    };
  }
  
  handleValidSubmit = (event, values) => {
    event.persist();
     
    if(this.handleValidation()){
        this.setState({validSubmit: true})
        this.setState({
            fields: {
                email: '',
                firstName: '',
                lastName: ''
            },
            errors: {
                email: '',
                firstName: '',
                lastName: ''
            }
        })
    } else {
        this.setState({validSubmit: false})
    }
    
    this.myFormRef.reset();
  }
  
  handleValidSubmit1 = (event, values) => {
    event.persist();
    
    if(this.handleValidation1()){
        this.setState({validSubmit1: true})
        this.setState({
            fields1: {
                email1: '',
                companyName: '',
                productName: '',
                productPrice: '',
                productQuantity: ''
            },
            errors1: {
                email1: '',
                companyName: '',
                productName: '',
                productPrice: '',
                productQuantity: ''
            }
        })
    } else {
        console.log(this.state.errors1)
        this.setState({validSubmit1: false})
    }
    
    this.myFormRef1.reset();
  }

  closeModal = () => {
    this.setState({validSubmit: false, validSubmit1: false});
    if(this.state.customer) {
        console.log(this.state.fields)
    } else {
        console.log(this.state.fields1)
    }
  }

  toggleForm = () => {
    this.setState({customer: false});
  }
 
  toggleForm1 = () => {
    this.setState({customer: true});
  }

  handleChange = (field, e) => {

    if(this.state.customer) {
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    } else {
        let fields1 = this.state.fields1;
        fields1[field] = e.target.value;        
        this.setState({fields1});
    }
}

handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    
    //Email
    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "Cannot be empty";
    }
    
    if(typeof fields["email"] !== "undefined"){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');
    
       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    }  

    //firstName
    if(!fields["firstName"]){
        formIsValid = false;
        errors["firstName"] = "Cannot be empty";
     }

    if(typeof fields["firstName"] === "undefined"){
       if(!fields["fisrtName"].match(/^[a-zA-Z]*$/)){
          formIsValid = false;
          errors["fisrtName"] = "Only letters";
       }        
    }

    //lastName
    if(!fields["lastName"]){
        formIsValid = false;
        errors["lastName"] = "Cannot be empty";
     }
 
     if(typeof fields["lastName"] !== "undefined"){
        if(!fields["lastName"].match(/^[a-zA-Z]*$/)){
           formIsValid = false;
           errors["lastName"] = "Only letters";
        }        
     }
    
   this.setState({errors: errors});
   return formIsValid;
}

handleValidation1(){
    let fields1 = this.state.fields1;
    let errors1 = {};
    
    let formIsValid1 = true;

    //Email1
    if(!fields1['email1']) {
        formIsValid1 = false;
        errors1["email1"] = "Cannot be empty";
    }
    if(typeof fields1["email1"] !== "undefined"){
        let lastAtPos = fields1["email1"].lastIndexOf('@');
        let lastDotPos = fields1["email1"].lastIndexOf('.');
     
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields1["email1"].indexOf('@@') === -1 && lastDotPos > 2 && (fields1["email1"].length - lastDotPos) > 2)) {
           formIsValid1 = false;
           errors1["email1"] = "Email1 is not valid";
         }
     } 
    

    //Company Name
    if(!fields1["companyName"]){
        formIsValid1 = false;
        errors1["companyName"] = "Cannot be empty";
     }

    if(typeof fields1["companyName"] === "undefined"){
        if(!fields1["companyName"].match(/start(.*?)end/)){
        formIsValid1 = false;
        errors1["companyName"] = "Only letters";
        }        
    }

    //Product Name
    if(!fields1["productName"]){
        formIsValid1 = false;
        errors1["productName"] = "Cannot be empty";
    }

    if(typeof fields1["productName"] !== "undefined"){
        if(!fields1["productName"].match(/^[0-9a-zA-Z]+$/)){
        formIsValid1 = false;
        errors1["productName"] = "Only letters";
        }        
    }

    //Product Price
    if(!fields1["productPrice"]){
        formIsValid1 = false;
        errors1["productPrice"] = "Cannot be empty";
    }

    if(typeof fields1["productPrice"] !== "undefined"){
        if(!fields1["productPrice"].match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
        formIsValid1= false;
        errors1["productPrice"] = "Only numbers";
        }        
    }

    //Product Quantity
    if(!fields1["productQuantity"]){
        formIsValid1 = false;
        errors1["productQuantity"] = "Cannot be empty";
    }

    if(typeof fields1["productQuantity"] !== "undefined"){
        if(!fields1["productQuantity"].match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)){
        formIsValid1 = false;
        errors1["productQuantity"] = "Only numbers";
        }        
    }
    
   this.setState({errors1: errors1});
   return formIsValid1;
}

}