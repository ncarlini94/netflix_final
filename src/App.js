import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage,
        SingInPage,
        SingUpPage,
        TrailerPage,
        MoviesPage,
        PopularPage,
        SeriesPage,
        DetailPage,
        ErrorPage,
        ProfilesPage,
        ManageAccountPage,
        ProfileSettingPage,
        ManageProfilesPage,
        ChangePasswordPage,
        ChangePlanPage,
        ChangeEmailPage,
        ChangeAvatarPage,
        AddProfilesPage,
        SelectAvatarPage,
        MyListPage,
        HelpPage
        } from './pages';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout/ProtectedLayout';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<PublicLayout/>}>
      <Route path='/SignIn' element={<SingInPage/>}/>
      <Route path='/SignUp' element={<SingUpPage/>}/>
      </Route>

      <Route element={<ProtectedLayout/>}>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/Popular' element={<PopularPage/>}/>
      <Route path='/Movies' element={<MoviesPage/>}/>
      <Route path='/Series' element={<SeriesPage/>}/>
      <Route path='/Trailer/:id'  element={<TrailerPage />}/>
      <Route path='/Detail/:id' element={<DetailPage/>}/>
      <Route path='/MyList' element={<MyListPage/>}/>
      <Route path='/Account' element={<ManageAccountPage/>}/>
      <Route path='/Profiles' element={<ProfilesPage/>}/>
      <Route path='/ManageProfiles' element={<ManageProfilesPage/>}/>
      <Route path='/ProfileSetting' element={<ProfileSettingPage/>}/>
      <Route path='/ChangePassword' element={<ChangePasswordPage/>}/>
      <Route path='/ChangePlan' element={<ChangePlanPage/>}/>
      <Route path='/ChangeEmail' element={<ChangeEmailPage/>}/>
      <Route path='/Avatar' element={<ChangeAvatarPage/>}/>
      <Route path='/AddProfile' element={<AddProfilesPage/>}/>
      <Route path='/SelectAvatar' element={<SelectAvatarPage/>}/>
      <Route path='/HelpPage' element={<HelpPage/>} />
      </Route>

      <Route path='*' element={<ErrorPage/>} />
    </Routes>

    </>
  );
}

export default App;
