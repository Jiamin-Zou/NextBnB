import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";

const ReviewForm = ({ trip, review }) => {
  const { setToggleReviewForm } = useModal()
  const dispatch = useDispatch()
  const handleClose = (e) => {
    e.preventDefault()
    setToggleReviewForm(false)
  }
  return <div>ReviewForm</div>;
};

export default ReviewForm;
