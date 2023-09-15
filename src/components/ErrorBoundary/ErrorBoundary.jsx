import React from "react";

export const ErrorBoundary = () => {
    // add styles
    return (
        <section style={{ textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "20px"}}>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </section>
    );
}
