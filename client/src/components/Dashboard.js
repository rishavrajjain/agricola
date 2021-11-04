import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {Link } from 'react-router-dom';

import BarChart from 'react-bar-chart';
import './dashboard.css';
 


function Dashboard(props) {

    const [isdocumented,setIsDocumented]=useState(false);

    const logout=()=>{
        // const token=localStorage.getItem('token');
        // const config={
        //     headers:{
        //         'Authorization':`Bearer ${token}`,
        //         'Content-type':'application/json'
        //     }
        // }

        // axios.post('http://localhost:5000/logout',config).then((res)=>{
        //     console.log(res);
            
        //     props.history.push('/');
        // }).catch((err)=>{
        //     console.log(err);
        // })
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        props.history.push('/');
    }

    var privateRoutes=(
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Agri Cola</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                   
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/dashboard"><i style={{marginRight:'5px'}} className="fa fa-bar-chart"></i>Dashboard</Link></li>
                    <li className="nav-item" role="presentation" onClick={logout}><Link className="nav-link" to="/dashboard"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Logout</Link></li>
                    
                       
        
                    
                    
                    
                    
                    
                    
                    
                </ul>
                
            </div>
           
        </div>
    </nav>
    )

    useEffect(()=>{
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
            props.history.push('/login')
        }

        document.getElementById('body').style.backgroundColor='white';
    },[])
    const [data,setData] =useState ([
        {text: 'Positivity', value: 500}, 
        {text: 'Negativity', value: 300},
        {text: 'Overall', value: 300} 
      ]);
       
      const margin = {top: 20, right: 20, bottom: 30, left: 40};

    const expertAIToken='eyJraWQiOiI1RDVOdFM1UHJBajVlSlVOK1RraXVEZE15WWVMMFJQZ3RaUDJGTlhESHpzPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y291bnRyeSI6IklOIiwic3ViIjoiNTFkM2IxNTAtMDA1Yi00NmIzLWJkZDgtY2NkZDJlMDQxMGVhIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpwZXJzb25hbGl6YXRpb25BdXRoIjoiMSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0FVSGdRMDhDQiIsImNvZ25pdG86dXNlcm5hbWUiOiI1MWQzYjE1MC0wMDViLTQ2YjMtYmRkOC1jY2RkMmUwNDEwZWEiLCJjdXN0b206Y29tcGFueSI6InRoZWdvb2QuaW4iLCJhdWQiOiIxZWdzNjNxOTlwM3NlYmVjaHNiNzI5dDgwbyIsImV2ZW50X2lkIjoiZDFmYzMxNWYtYjRkNS00MzIyLTgwMTYtNzk1YzE2NGRhMDZiIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MzYwMDY0NDUsIm5hbWUiOiJBYmhheSIsImV4cCI6MTYzNjA5Mjg0NSwiaWF0IjoxNjM2MDA2NDQ1LCJmYW1pbHlfbmFtZSI6IlBhdGVsIiwiZW1haWwiOiJhYmhheXJwYXRlbDEwQGdtYWlsLmNvbSIsImN1c3RvbTptYXJrZXRpbmdBdXRoIjoiMCJ9.U--YxwaYEHhZINjuVLa1zF9fRn9iIXKnfQq6NJUmPGvP6tWdmHakw4PvkydUAWU_4IIEdls98RA_kLcTiAs6RLmoSYJvtIUys6oujlS_QES8SRITF9nLHhFddd3q7ivBkGZq1yNcsSW1owtvq7a3SBrdrDesrMCJotP5m5O-t5pWjd88o3VtL08m7xaE7CWCXKbLW0tCWlTlhiajz5CtLTmuYwCPgWwVcvHGurNc2ohgrk-ewCtxj-j00TtUgmDPRwmo6ShemGSLPBeycB-Oq2UVi9vc4RB6ar6af9cG2SsNjVyKzWELefoNkpAZl2kVL8Vrze8GiJ2-0bExUM3RRA';

    const [text,setText]=useState('');
    const [topics,setTopics]=useState([]);
    const [main,setMain]=useState([]);
    const [entities,setEntities]=useState([]);

    

    const onChange=(e)=>{
        setText(e.target.value);
    }

    

    const baseURL='https://nlapi.expert.ai/v2/analyze/standard/en/relevants'
    const config = {
        headers: { 'Authorization': `Bearer ${expertAIToken}`,
        'Content-type':'application/json'
     }
    };

    const submit=(e)=>{
        e.preventDefault();
        axios.post(baseURL,{
            document:{
                text:text
            }
        },config).then((res)=>{
            console.log(res.data)
            setTopics(res.data.data.topics)
            setMain(res.data.data.mainSentences)
        }).catch(err=>{
            console.log(err);
        })

        axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/entities',{
            document:{
                text:text
            }
        },config).then((res)=>{
            console.log(res.data)
            setEntities(res.data.data.entities)
        }).catch((err)=>{
            console.log(err);
        })
        
        axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/sentiment',{
            document:{
                text:text
            }
        },config).then((res)=>{

            const datavalues=[...data];
            var item=datavalues[0];
            item.value=res.data.data.sentiment.positivity;
            datavalues[0]=item;

            item=datavalues[1];
            item.value=Math.abs(res.data.data.sentiment.negativity);
            datavalues[1]=item;

            item=datavalues[2];
            item.value=res.data.data.sentiment.overall;
            datavalues[2]=item;

            
           setData(datavalues);

            console.log(data);

            
        }).catch((err)=>{
            console.log(err);
        })
        
        setIsDocumented(true);

    }

    const translate=(lang)=>{
        const url=`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;

        var topicsString='';
        topics.map((topic)=>{
            topicsString=topicsString+topic.label+"|";
        })

        var mainString='';
        main.map(m=>{
            mainString=mainString+m.value+"|"
        })

        var entitiesString='';
        entities.map(entity=>{
            entitiesString=entitiesString+entity.lemma+"|"
        })

        console.log(process.env.REACT_APP_AZURE_KEY_TRANSLATION)
        console.log(entitiesString)
        

        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TRANSLATION}`,
                'Ocp-Apim-Subscription-Region':'eastus',
                'Content-Type':'application/json'
            }
           
        }
        axios.post(url,[
            {
                "text":topicsString
            },
            {
                "text":mainString
            },
            {
                "text":entitiesString
            }
        ],config).then((res)=>{
            

            const translatedTopics=res.data[0].translations[0].text.split("|");
            const translatedMain=res.data[1].translations[0].text.split("|");
            const translatedEntity=res.data[2].translations[0].text.split("|");

            const transdatatopics=[];
            translatedTopics.map((topic)=>{

                if(topic !== ''){
                    transdatatopics.push({
                        label:topic
                    })
                }
                
            })
            setTopics(transdatatopics);
            const transdatamain=[]
            const transdataentity=[]

            translatedMain.map((main)=>{
                if(main !== ''){
                    transdatamain.push({
                        value:main
                    })
                }
                
            })
            setMain(transdatamain);

            translatedEntity.map((entity)=>{

                if(entity !== ''){
                    transdataentity.push({
                        lemma:entity
                    })
                }
                
            })
            setEntities(transdataentity);


        }).catch(err=>{
            console.log(err);
        })
    }

    

    const selectLanguage=(e)=>{
        switch(e.target.value){
            case 'English':{
                translate('en');
                break;
            }
            case 'हिन्दी':{
                translate('hi');
                break;
            }
            case 'ગુજરાતી':{
                translate('gu');
                break;
            }
            case 'தமிழ்':{
                translate('ta');
                break;
            }
            case 'ಕನ್ನಡ':{
                translate('kn');
                break;
            }

            default :{
                break;
            }

        }
        return;
    }

   
    return isdocumented?(
        <div>
            {privateRoutes}
            <div className="container">
            
            <label for="exampleFormControlTextarea1" style={{marginTop:'3rem'}}>Legal Text</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={text}></textarea>
            
            <div style={{marginTop:'2rem'}}class="form-group">
            <label for="exampleFormControlSelect1">Choose Language</label>
            <select class="form-control" id="exampleFormControlSelect1" onChange={selectLanguage}>
            <option  >English</option>
              <option>हिन्दी</option>
              <option>ગુજરાતી</option>
              <option>தமிழ்</option>
              <option>ಕನ್ನಡ</option>
              
            </select>
          </div>
           
            <div className="row">
                <div className="col col-lg-4" style={{marginTop:'2rem'}}>
                {
                    topics.map((topic)=>{
                        return(
                            <h5><span style={{marginRight:'10px'}} class="badge badge-success">{topic.label}</span></h5>
                        )
                    })
                }
                </div>
                <div className="col col-lg-8">
                <ul class="list-group" style={{marginTop:'2rem'}}>
                <li class="list-group-item"><b>Main Characters/Entities involved</b></li>
                {
                    entities.map((entity)=>{
                        return(
                            <li class="list-group-item">{entity.lemma}</li>
                        )
                    })
                }
                
                
            </ul>
                    
                </div>
            </div>

            <div class="card" style={{marginTop:'2rem'}} >
                
                    <div class="card-body">
                    <h5 class="card-title">Summary</h5>
                    {
                        main.map((maintext)=>{
                            return(
                                <p className="text-justify">{maintext.value}</p>
                            )
                        })
                    }
                        
                    
                    </div>
                </div>

            
          
                    
            </div>
            <h5 style={{textAlign:'center',marginTop:'2rem'}}>Sentiment of the document</h5>
            <div style={{width: '100%'}}> 
                <BarChart ylabel='Scale'
                  width={500}
                  height={500}
                  margin={margin}
                  data={data}
                  />
            </div>
                
            
        </div>

    ):(
        <div>
        {privateRoutes}
            <div className="container">
            <form class="form-group" style={{marginTop:'3rem'}} onSubmit={submit}>
                <label for="exampleFormControlTextarea1">Enter/Paste the text</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" onChange={onChange}></textarea>

                <button style={{marginTop:'20px'}} type="submit" className="btn btn-block btn-success">Submit</button>
            </form>
                    
                </div>
                
            
        </div>
    )
}

export default Dashboard;
