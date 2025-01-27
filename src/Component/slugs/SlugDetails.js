"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { API_CONFIG } from "@/config/app_config";
import Link from "next/link";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const SlugDetails = ({ slugName }) => {
    const [slug_data, setSlug_data] = useState();

    const getData = async () => {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}/get_page_by_slug?slug=${slugName}`
        );

        if (!response.ok) {
            return null;
        }

        const data = await response?.json();
        if (data.type === "success") {
            setSlug_data(data?.data)
            return data?.data;
        }
        return null;
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="min-vh-100 single_page d-flex flex-column">
           <Header/> 
            <div className="bg-black  pt-5 pb-5 flex-grow-1">
                <div
                    className="container mx-auto text-white"
                    dangerouslySetInnerHTML={{ __html: slug_data?.content || "" }}
                ></div>
            </div>
            <Footer/>
        </div>
    );
};

export default SlugDetails;
