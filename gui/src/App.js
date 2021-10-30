import React from 'react';
import { TweetList, TweetCreateForm } from './tweets';



function App() {
  
  return (
    <div>
      <div className="py-lg-6 py-4 bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div>
                <h1 className="text-white display-4 mb-0">Welcome to TweetMe!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="container"> 
            <div className="card">
                <div className="card-body">
                    <div className="d-lg-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center mb-4 mb-lg-0">
                            <img src="%PUBLIC_URL%/assets/images/avatar/avatar.jpg" id="img-uploaded" className="avatar-xl rounded-circle" alt="" />
                            <div className="ml-3">
                                <div className="d-none alert alert-danger" id="tweet-create-form-error">

                                </div>
                                <TweetCreateForm />
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <TweetList />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
