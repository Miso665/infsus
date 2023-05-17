import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../../components/Navbar";


function Home() {
    return (
        <>

            <div style={{
                backgroundImage: `url("banner-bmw.jpg")`,
                height: "92vh",
                width: "100vw"
            }}>
                <h1 style={{
                    color: "white",
                    margin: "auto",
                    width: "20%",
                    height: "100%",
                    textAlign: "center",
                    verticalAlign: "middle"

                }}>Car Dealership
                </h1>
            </div>
            <image href="banner-bmw.jpg"></image>
        </>
    )

}
export default Home