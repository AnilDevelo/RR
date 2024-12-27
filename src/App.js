import React,{ Suspense } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRouters from 'Routers/PrivateRouter';
import PublicRouters from 'Routers/PublicRouter';
import {PublicroutesArray, PrivateroutesArray} from './routes'
import store from "./Redux/store";
import Layout from "./Layout";
import Loader from "./hoc/LoaderMain";
import { ToastContainer } from 'react-toastify';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const loading = () =>  <div className='site_loader'><img src={Logo} alt={"Logo"} height={150} className={"Logo"} /> </div> ;
// const loading = () =>  <div className='site_loader'><Loader/> </div> ;
function App() {

    return (
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter >
                <Suspense fallback={<Loader className={'content-loader'}/>}>
                    <Routes>
                        {PublicroutesArray.map(({ component: Component, path }, key) => {
                            return <Route
                                path={path}
                                element={
                                    <PublicRouters>
                                        <Component />
                                    </PublicRouters>
                                }
                                key={key}
                            />
                        })}
                        {PrivateroutesArray?.map(({ component: Component, path, title }, key) => (
                            <Route
                                path={path}
                                element={
                                    <PrivateRouters>
                                        <Layout title={title}>
                                            <Component />
                                        </Layout>
                                    </PrivateRouters>
                                }
                                key={key}
                            />
                        ))}
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
