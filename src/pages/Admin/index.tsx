import { useEffect, useState } from "react";
import { Admin } from "../../interfaces/Admin.interface";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/Loading";
import Modal from "../../components/Modal";
import SearchAndLimit from "../../components/SearchInput";
import axiosInstance from "../../configs/axiosConfigs";
import AdminRow from "../../components/Admin/AdminRow";
import AddAdminForm from "../../components/Admin/AddAdminForm";
import UpdatePermissionForm from "../../components/Admin/UpdatePermissionForm";

export default function Page() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [totalAdmins, setTotalAdmins] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleAddAdmin = () => {
    setModalTitle("Thêm Quản trị viên");
    setModalContent(<AddAdminForm />);
    setIsModalOpen(true);
  };

  const handleUpdatePermission = (admin: Admin) => {
    setModalTitle("Sửa quyền hạn Quản trị viên");
    setModalContent(<UpdatePermissionForm admin={admin} />);
    setIsModalOpen(true);
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/list", {
        params: {
          limit,
          page,
          key_name: search,
        },
      });
      setAdmins(response.data.data.admins);
      setTotalAdmins(response.data.data.count);
      let ttPage = Math.ceil(response.data.data.count / limit);
      setTotalPages(ttPage);
    } catch (error) {
      console.error("Error fetching Admins:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Quản trị viên</h1>

      <div className="flex items-center justify-between">
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />

        <div className="mb-4 flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddAdmin}
          >
            Thêm Quản trị viên
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative">
          <div className="max-h-[410px] overflow-y-scroll">
            <h1 className="mb-2 font-bold text-xl">
              Tổng số Quản trị viên : {totalAdmins}
            </h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Họ Tên</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Vai trò</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                  <th className="px-4 py-2 border">Quyền hạn</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((Admin) => (
                  <AdminRow
                    key={Admin.id}
                    admin={Admin}
                    onUpdate={handleUpdatePermission}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
