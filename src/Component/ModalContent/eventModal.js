"use Client";

import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../Modal/commonModal";
import Button from "../Hotel/Button/Button";
import Image from "next/image";
import "./modalContent.css";
import { useDispatch, useSelector } from "react-redux";

const EventModal = ({ show, onClose, editable }) => {
  console.log(editable, "this is editable");
  const dispatch = useDispatch();

  return (
    <CommonModal className={"eventModal"} show={show} onClose={onClose}>
      <div className="">
        <div className="outer_events_fields">
          <h2 className="main_heading text-left mt-2">Add Event</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mt-2">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
            </div>
           
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
                Start Date
                </label>
                <input
                  type="date"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
               End Date
                </label>
                <input
                  type="date"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
                 Start Time
                </label>
                <input
                  type="time"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
               End Time
                </label>
                <input
                  type="time"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="col-md-12">
             <div className="d-flex align-items-end gap-3">
             <div className="form-group mt-2 flex-grow-1">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
                 Add Image
                </label>
                   
                <div class="add_event_image">
                <p>Upload Image</p>
                <input
                  type="file"
                  className="form-control cmn_input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
                </div>
              </div>
             <div className="title_image">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="8" fill="#FBC42E"/>
<path d="M11.25 5L5 11.25M5 5L11.25 11.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

             <img src="/assets/globe_icon.svg" alt="" />
             </div>
             </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mt-3">
                <label
                  className="form-label cmn_label"
                  htmlFor="exampleInputEmail1"
                >
                Descritpion
                </label>
               <textarea  className="form-control cmn_input" name="" id="" placeholder="Add Description"></textarea>
              </div>
            </div>
          </div>

          <div className="events_fields_button text-end mt-3">
            <button type="submit" class="cmn_btn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default EventModal;
