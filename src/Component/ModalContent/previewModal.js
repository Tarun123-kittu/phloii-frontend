"use Client";

import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../Modal/commonModal";
import "./modalContent.css";


const PreviewModal = ({ show, onClose,hotel_details }) => {

    return (
        <CommonModal className={"eventModal"} show={show} onClose={onClose}>
            <div className="">
                <div className="outer_events_fields">
                    <h2 className="main_heading text-left mt-2">Preview</h2>
             
                </div>
            </div>
        </CommonModal>
    );
};

export default PreviewModal;
