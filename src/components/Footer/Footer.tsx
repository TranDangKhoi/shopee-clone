import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white-100 py-16">
      <div className="container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="text-sm">© {new Date().getFullYear()} Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className="text-sm">Quốc gia & Khu vực: Việt Nam | Singapore</div>
        </div>
        <div className="mt-10 text-center text-sm">
          <div>Công ty TNHH Shoppee</div>
          <div className="mt-6">
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className="mt-2">
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className="mt-2">
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className="mt-2">© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
