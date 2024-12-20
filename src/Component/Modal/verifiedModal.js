import React from 'react'
import './modal.css'
const VerifiedModal = ({modalId}) => {
  return (
    <div
    className={`modal fade cmn_modal`}
    id={modalId}
    tabIndex="-1"
    aria-labelledby={`${modalId}`}
    aria-hidden="true"
>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header border-0">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.26757 1.08977L10.2681 8.09027L17.2323 1.12604C17.3861 0.962306 17.5714 0.831322 17.7771 0.740946C17.9828 0.65057 18.2046 0.602663 18.4293 0.600098C18.9103 0.600098 19.3716 0.791173 19.7117 1.13129C20.0518 1.47141 20.2429 1.9327 20.2429 2.4137C20.2471 2.63605 20.2059 2.85692 20.1217 3.06275C20.0374 3.26859 19.9121 3.45504 19.7532 3.61068L12.6983 10.5749L19.7532 17.6298C20.0521 17.9222 20.2274 18.3182 20.2429 18.7361C20.2429 19.2171 20.0518 19.6784 19.7117 20.0185C19.3716 20.3586 18.9103 20.5497 18.4293 20.5497C18.1981 20.5593 17.9675 20.5207 17.7521 20.4364C17.5367 20.3521 17.3411 20.224 17.1779 20.06L10.2681 13.0595L3.28571 20.0419C3.13247 20.2002 2.9494 20.3265 2.74707 20.4137C2.54474 20.5009 2.32715 20.5471 2.10687 20.5497C1.62587 20.5497 1.16457 20.3586 0.824455 20.0185C0.484339 19.6784 0.293264 19.2171 0.293264 18.7361C0.289035 18.5138 0.330289 18.2929 0.414494 18.0871C0.498699 17.8812 0.624078 17.6948 0.782936 17.5391L7.83785 10.5749L0.782936 3.52C0.484027 3.22757 0.308751 2.83157 0.293264 2.4137C0.293264 1.9327 0.484339 1.47141 0.824455 1.13129C1.16457 0.791173 1.62587 0.600098 2.10687 0.600098C2.54213 0.605538 2.95926 0.781458 3.26757 1.08977Z" fill="white"/>
                </svg>
                </button>
            </div>
            <div className="modal-body">
             <div className='text-center'>   
             <img src="/assets/logo.png" alt="" />
             </div>
             <p className='verifed_text'>Verified Link!</p>
             <p className='model_desc'>
             I have shared a link with you via email. Your hotel will not be verified until the payment is completed
             </p>
             <p></p>
            </div>
      
        </div>
    </div>
</div>
  )
}

export default VerifiedModal