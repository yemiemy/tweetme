import React from 'react';
import { TweetComponent } from './tweets';



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
                    <TweetComponent />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
