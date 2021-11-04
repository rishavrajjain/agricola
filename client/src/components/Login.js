import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
function Login(props) {

    const openRoutes=(
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Agri Cola</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" role="presentation"><Link className="nav-link" to="/login"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Login</Link></li>
                <li className="nav-item" role="presentation"><Link className="nav-link" to="/signup"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Signup</Link></li>
                    
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    );

    useEffect(() => {
        document.getElementById('body').style.backgroundColor='#0275d8';
        
    }, [])

    const [user,setUser]=useState({
        email:'',
        password:''
    })

    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const submit=(e)=>{
        e.preventDefault();

        const {email,password}=user;
        if(email === '' || password === ''){
            alert('Email/Password cannot be empty');
        }

        axios.post('https://agri-cola.herokuapp.com/login',{
            email,
            password
        }).then(res=>{
            console.log(res);
            localStorage.setItem('token',res.data.data.token);
            localStorage.setItem('name',res.data.data.name);
            localStorage.setItem('email',res.data.data.email);
            props.history.push('/dashboard');
        }).catch(err=>{
            alert('Invalid Credentials / Something went wrong');
            
        })



        
    }
    return (
        
        <div>
        {openRoutes}
        <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-7 col-lg-7 col-xl-7">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                
                                <div class="col-lg-12">
                                
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4">Agri Cola</h4>
                                        </div>
    
                                        <h5></h5>
                                        
                                        <a href="https://imgbb.com/"><img src="https://i.postimg.cc/rw4ZhPxN/img.png" alt="Legal-Expert" border="0"/></a>
                                        
                                        <h5>Making legal documents readable and approachable</h5>
                                        
                                        
                                       
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-lg-5 col-xl-5">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                
                                <div class="col-lg-12">
                                
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4">Welcome Back!</h4>
                                        </div>
                                        <form class="user" onSubmit={submit}>
                                            <div class="form-group"><input class="form-control form-control-user" type="email" id="email" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" onChange={onChange} value={user.email}/></div>
                                            <div class="form-group"><input class="form-control form-control-user" type="password" id="password" placeholder="Password" name="password" onChange={onChange} value={user.password}/></div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <div class="form-check"><input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1"/><label class="form-check-label custom-control-label" for="formCheck-1">Remember Me</label></div>
                                                </div>
                                            </div><button class="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                                            
                                        </form>
                                       
                                        <div class="text-center"><Link class="small" to="/signup">Create an Account!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
        
    )
}


export default Login;