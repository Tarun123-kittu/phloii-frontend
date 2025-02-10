"use Client";

import React, { useState, useEffect, useRef } from "react";
import CommonModal from "../Modal/commonModal";
import Button from "../Hotel/Button/Button";
import Image from "next/image";
import "./modalContent.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { create_new_event, clear_create_event_state } from "@/utils/redux/slices/eventsSlice/createEvent";
import { get_all_events, clear_get_all_events_state } from "@/utils/redux/slices/eventsSlice/getAllEvents";
import { get_single_event, clear_get_single_event_state } from "@/utils/redux/slices/eventsSlice/getSingleEvent";
import { update_event, clear_update_event_state } from "@/utils/redux/slices/eventsSlice/updateEvent";
import DeleteModal from "../deleteModal/DeleteModal";
import { delete_event, clear_delete_event_state } from "@/utils/redux/slices/eventsSlice/deleteEvents";
import Loader from "../loader/Loader";

const EventModal = ({ show, onClose, editable, hotelId, eventId }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [description, setDescription] = useState("")
    const [titleError, setTitleError] = useState("")
    const [startDateError, setStartDateError] = useState("")
    const [endDateError, setEndDateError] = useState("")
    const [startTimeError, setStartTimeError] = useState("")
    const [endTimeError, setEndTimeError] = useState("")
    const [imageError, setImageError] = useState("")
    const [imagePreviewError, setImagePreviewError] = useState("")
    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    const [descriptionError, setDescriptionError] = useState("")
    const is_event_created = useSelector((store) => store.CREATE_EVENT)
    const single_event_details = useSelector((store) => store.GET_SINGLE_EVENT)
    const is_event_updated = useSelector((store) => store.UPDATE_EVENT)
    const is_event_deleted = useSelector((store) => store.DELETE_EVENT)

    useEffect(() => {
        return () => {
            dispatch(clear_get_single_event_state())
        }
    }, [])


    const handleFileChange = (e) => {
        setImageError("");
        setImagePreviewError("");
        const file = e.target.files[0];
    
        if (file) {
            const fileType = file.type;
            const fileSize = file.size;
    
            if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
                toast.error("Only PNG and JPG images are allowed.");
                setImage("");
                return;
            }
    
            if (fileSize > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                setImage("");
                return;
            }
    
            const img = new window.Image();
            const reader = new FileReader();
    
            reader.onloadend = () => {
                img.src = reader.result;
            };
    
            img.onload = () => {
                if (img.width <= img.height) {
                    toast.error("Image must be in landscape orientation");
                    setImage("");
                    return;
                }
    
                setImage(file);
                setImagePreview(reader.result);
                setImageError("");
                setImagePreviewError("");
            };
    
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage("");
        setImagePreview('');

        if (typeof document !== 'undefined') {
            const fileInput = document.getElementById("fileInput");
            if (fileInput) {
                fileInput.value = "";
            }
        }
    };

    const handleSubmit = () => {
        if (!title && !startDate && !endDate && !startTime && !endTime && !image && !description) {
            setTitleError("Please enter event title")
            setStartDateError("Please enter event start date")
            setEndDateError("Please enter event end date")
            setStartTimeError("Please enter event start time")
            setEndTimeError("Please enter event end time")
            setImageError("Please Provide event image")
            setDescriptionError("Please enter event description")
            return
        }
        if (!title) {
            setTitleError("Please enter event title")
            return
        }
        if (!startDate) {
            setStartDateError("Please enter event start date")
            return
        }
        if (!endDate) {
            setEndDateError("Please enter event end date")
            return
        }
        if (!startTime) {
            setStartTimeError("Please enter event start time")
            return
        }
        if (!endTime) {
            setEndTimeError("Please enter event end time")
            return
        }
        if (!image && !eventId && !editable) {
            setImageError("Please Provide event image")
            return
        }
        if (!description) {
            setDescriptionError("Please enter event description")
            return
        }
        if (!eventId && !editable) {
            dispatch(create_new_event({ title, startDate, endDate, startTime, endTime, image, hotelId, description }))
        } else {
            dispatch(update_event({ title, startDate, endDate, startTime, endTime, image, hotelId, description, eventId }))
        }

    }

    useEffect(() => {
        if (is_event_created?.status === "Success") {
            toast.success("Event created Successfully!!")
            dispatch(clear_create_event_state())
            dispatch(get_all_events({ hotelId }))
            onClose()
        }
        if (is_event_created?.status === "Error") {
            toast.error("Errow while creating Event.Please try again later")
            dispatch(clear_create_event_state())
        }
    }, [is_event_created])

    useEffect(() => {
        if (eventId) {
            dispatch(get_single_event({ eventId }))
        }
    }, [eventId])

    useEffect(() => {
        if (single_event_details?.status === "Success" && eventId && editable) {
            setTitle(single_event_details?.data?.data?.eventTitle)
            setStartDate(single_event_details?.data?.data?.eventStart?.date?.split("T")[0]);
            setEndDate(single_event_details?.data?.data?.eventEnd?.date?.split("T")[0]);
            setStartTime(single_event_details?.data?.data?.eventStart?.time)
            setEndTime(single_event_details?.data?.data?.eventEnd?.time)
            setImagePreview(single_event_details?.data?.data?.image)
            setDescription(single_event_details?.data?.data?.eventDescription)
        }
    }, [single_event_details])

    useEffect(() => {
        if (is_event_updated?.status === "Success") {
            toast.success("Event updated successfully")
            dispatch(get_all_events({ hotelId }))
            dispatch(clear_update_event_state())
            onClose()
        }
        if (is_event_updated?.status === "Error") {
            toast.error("Error while updating event.please try again later")
            dispatch(clear_update_event_state())
        }
    }, [is_event_updated])

    const handleDelete = () => {
        setViewDeleteModal(true)
    }

    const closeModal = () => {
        setViewDeleteModal(false)
    }

    const handleDeleteEvent = () => {
        dispatch(delete_event({ eventId }))
    }

    useEffect(() => {
        if (is_event_deleted?.status === "Success") {
            toast.success("Event deleted successfully")
            dispatch(get_all_events({ hotelId }))
            dispatch(clear_delete_event_state())
            setViewDeleteModal()
            onClose()
        }
        if (is_event_deleted?.status === "Error") {
            toast.error("Error while deleting event.please try again later")
            dispatch(clear_delete_event_state())
        }
    }, [is_event_deleted])

    return (
        <CommonModal className={"eventModal"} show={show} onClose={onClose}>
            <div className="">
                <div className="outer_events_fields" style={single_event_details?.status === "Loading" ? {height:"150px"} : {}}>
                    <h2 className="main_heading text-left mt-2">{eventId && editable ? "Edit Event" : "Add Event"}</h2>
                    {single_event_details?.status === "Loading" && editable && eventId ? <Loader /> : <div className="row">
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
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); setTitleError("") }}
                                    style={titleError ? { border: "1px solid red" } : {}}
                                />
                                {titleError && (
                                    <span style={titleError ? { color: "red", fontSize: "12px" } : {}}>
                                        {titleError}
                                    </span>
                                )}
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
                                    value={startDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => { setStartDate(e.target.value); setStartDateError("") }}
                                    style={startDateError ? { border: "1px solid red" } : {}}
                                />
                                {startDateError && (
                                    <span style={startDateError ? { color: "red", fontSize: "12px" } : {}}>
                                        {startDateError}
                                    </span>
                                )}
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
                                    value={endDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => { setEndDate(e.target.value);; setEndDateError("") }}
                                    style={endDateError ? { border: "1px solid red" } : {}}
                                />
                                {endDateError && (
                                    <span style={endDateError ? { color: "red", fontSize: "12px" } : {}}>
                                        {endDateError}
                                    </span>
                                )}
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
                                    value={startTime}
                                    onChange={(e) => { setStartTime(e.target.value); setStartTimeError('') }}
                                    style={startTimeError ? { border: "1px solid red" } : {}}
                                />
                                {startTimeError && (
                                    <span style={startTimeError ? { color: "red", fontSize: "12px" } : {}}>
                                        {startTimeError}
                                    </span>
                                )}
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
                                    value={endTime}
                                    onChange={(e) => { setEndTime(e.target.value); setEndTimeError('') }}
                                    style={endTimeError ? { border: "1px solid red" } : {}}
                                />
                                {endTimeError && (
                                    <span style={endTimeError ? { color: "red", fontSize: "12px" } : {}}>
                                        {endTimeError}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <div className="form-group mt-3 flex-grow-1">
                                    <label
                                        className="form-label cmn_label"
                                        htmlFor="exampleInputEmail1"
                                    >
                                        Add Image
                                    </label>

                                    <div class="add_event_image" style={imageError ? { border: "1px solid red" } : {}}>
                                        {!imagePreview && <p>Upload Image</p>}
                                       { !imagePreview && <input
                                            type="file"
                                            className="form-control cmn_input"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter title"
                                            onChange={handleFileChange}

                                        />}
                                        {imagePreview &&  <div className="title_image">
                                    <svg onClick={handleRemoveImage} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="16" rx="8" fill="#FBC42E" />
                                        <path d="M11.25 5L5 11.25M5 5L11.25 11.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <img src={imagePreview || "/assets/globe_icon.svg"} alt="" />
                                </div>}
                                    </div>
                                    {imageError && (
                                        <span style={imageError ? { color: "red", fontSize: "12px" } : {}}>
                                            {imageError}
                                        </span>
                                    )}
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label
                                    className="form-label cmn_label"
                                    htmlFor="exampleInputEmail1"
                                >
                                    Descritpion
                                </label>
                                <textarea
                                    className="form-control cmn_input"
                                    rows={3}
                                    name=""
                                    id=""
                                    placeholder="Add Description"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); setDescriptionError('') }}
                                    style={descriptionError ? { border: "1px solid red" } : {}}
                                />
                                {descriptionError && (
                                    <span style={descriptionError ? { color: "red", fontSize: "12px" } : {}}>
                                        {descriptionError}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>}

                    {!eventId && !editable && <div className="events_fields_button text-end mt-3">
                        <button onClick={() => handleSubmit()} type="submit" className="cmn_btn" disabled={is_event_created?.status === "Loading"}>
                            Submit{is_event_created?.status === "Loading" && <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only"></span>
                            </div>}
                        </button>
                    </div>}
                    {eventId && editable && single_event_details?.status !== "Loading" && <div className="events_fields_button text-end mt-3">
                        <button onClick={() => handleDelete()} type="submit" className="cmn_btn m-3" disabled={is_event_deleted?.status === "Loading"}>
                            Delete{is_event_deleted?.status === "Loading" && <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only"></span>
                            </div>}
                        </button>
                        <button onClick={() => handleSubmit()} type="submit" className="cmn_btn" disabled={is_event_updated?.status === "Loading"}>
                            Update{is_event_updated?.status === "Loading" && <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only"></span>
                            </div>}
                        </button>
                    </div>}
                </div>
                {viewDeleteModal && <DeleteModal isVisible={viewDeleteModal} onClose={closeModal} title={"Are You Sure"} message={"Do you want to delete this event ?"} onConfirm={handleDeleteEvent} is_subscription_deleted={is_event_deleted} />}
            </div>
        </CommonModal>
    );
};

export default EventModal;
