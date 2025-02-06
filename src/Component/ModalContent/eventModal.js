'use Client'

import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../Modal/commonModal";
import Button from "../Hotel/Button/Button";
import Image from "next/image";
import "./modalContent.css";
import { useDispatch, useSelector } from "react-redux";

const EventModal = ({ show, onClose, editable }) => {
    console.log(editable,"this is editable")
    const dispatch = useDispatch()

    return (
        <CommonModal className={'eventModal'} show={show} onClose={onClose}>
            <div className="">
                <div className="">
                    <div className="">
                        <div className="outer_events_fields">
                            <div className="form-group mt-3">
                                <label className="label_events_fields" htmlFor="exampleInputEmail1">Event Title</label>
                                <input type="text" className="form-control cmn_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="label_events_fields" htmlFor="exampleInputEmail1">Event Title</label>
                                <input type="text" className="form-control cmn_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="label_events_fields" htmlFor="exampleInputEmail1">Event Title</label>
                                <input type="text" className="form-control cmn_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="label_events_fields" htmlFor="exampleInputEmail1">Event Title</label>
                                <input type="text" className="form-control cmn_input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                            </div>
                            <div className="events_fields_button">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </CommonModal>
    );
};

export default EventModal;
