import { Routes, Route } from 'react-router-dom';
import Registration from '../Components/Registration/Registration';
import Login from "../Components/Login/Login";
import Home from '../Components/home/Home';
import Allusers from '../Components/Allusers/Allusers';
import All from '../Components/All/All';
import UpdateUser from "../Components/update/UpdateUser";
import ImageUpload from "../Components/image/ImageUpload";
import ImageComponent from '../Components/image/ImageComponent';
import ImageComponent1 from '../Components/image/ImageComponent1';
import UploadExcelFile from '../Components/upload/UploadExcelFile';
import GetExceldata from '../Components/getexceldata/GetExceldata';
import Login1 from '../Components/Search/Login1';
import Hamburger from '../Components/Hamburger/Hamburger';
import UserForm from '../Components/task1/task';
import AddressDropdown from '../Components/task1/AddressDropdown';
import Officer from '../Components/Officer/Officer';
import Admin from '../Components/Admin/Admin';
import UploadEmployeeData from '../Components/Employee/employee';
import Filtertask from '../Components/task1/Filtertask';


export const AppRoutes = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/users">
        <Route index element={<Home />} />
        </Route>
        <Route path="/profile-users" element={<Allusers />} />
        <Route path="/all-users" element={<All />} />
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/upload-image" element={<ImageUpload />} />
        <Route path="/get-imagename" element={<ImageComponent />} />
        <Route path="/get-imageid" element={<ImageComponent1 />} />
        <Route path="/upload-excel" element={<UploadExcelFile />} />
        <Route path="/get-excel" element={<GetExceldata />} />
        <Route path="/search" element={<Login1/>} />
        <Route path="/hamburger" element={<Hamburger/>}/>
        <Route path="/userform" element={<UserForm/>}/>
        <Route path="/addressdropdown" element={<AddressDropdown/>}/>
        <Route path="/officer" element={<Officer/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/uploademployee" element={<UploadEmployeeData/>}/>
        <Route path="/Filter-details" element={<Filtertask/>}/>
      </Routes>
    </div>
  );
};
