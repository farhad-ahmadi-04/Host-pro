import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    // modal for FORM
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button> Open Form</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm />
      </Modal.Window>

      {/* modal for TABLE
      <Modal.Open opens={"cabin-table"}>
        <Button> Open Form</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-table"}>
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

// function AddCabin() {
//   const [openingModal, setOpeningModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpeningModal((show) => !show)}>
//         Open Form
//       </Button>
//       {openingModal && (
//         <Modal onClose={() => setOpeningModal((open) => !open)}>
//           <CreateCabinForm
//             onCloseModal={() => setOpeningModal((open) => !open)}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
