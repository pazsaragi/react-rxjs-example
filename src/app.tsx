import React from "react";

//----------Containers----------------//

//----------Redux----------------//
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store/reducers";
import { useServiceProvider } from "lib/service-provider-react";
import { HttpClient } from "lib/http";
import { environment } from "environments/environment";
import { useHistory } from "react-router-dom";

export const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fake = useSelector((state: AppState) => state.test.fake);
  const di = useServiceProvider();

  // useEffect(() => {
  //   const http: HttpClient = di.get('http');
  //   http.addInterceptor(res=> {
  //     const t = localStorage.getItem('access_token');
  //     if(t && res.status == 401){
  //       dispatch( authLogout())
  //     }
  //   })
  // }, [dispatch, di])

  return (
    <div className="app">
      <h1>Home</h1>
    </div>
  );
};
