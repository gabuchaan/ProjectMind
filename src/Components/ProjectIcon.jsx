import React from "react";

const ProjectIcon = (props) => {

    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------
    function handlerProjectSelected() {
        props.onClick(props.project)
    }

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <div className="bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500" onClick={handlerProjectSelected}>
            <img src={props.project.data.image} alt="" />
        </div>
    )
}

export default ProjectIcon;