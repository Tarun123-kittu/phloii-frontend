"use Client";

import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../Modal/commonModal";
import "./modalContent.css";


const PreviewModal = ({ show, onClose, hotel_details }) => {
    console.log(hotel_details,"this is the hotel details")

    return (
        <CommonModal className={"eventModal"} show={show} onClose={onClose}>
            <div className="">
                <div className="outer_events_fields">
                    <h2 className="main_heading text-left mt-2">Preview</h2>
                    <div className="d-flex gap-4">
                        {hotel_details?.hotel?.images?.map((image,i) => {
                            return(
                                <img key={i} src={image} alt="support" width={70} height={70}/>
                            )
                        })}
                       
                    </div>
                </div>
            </div>
        </CommonModal>
    );
};

export default PreviewModal;
