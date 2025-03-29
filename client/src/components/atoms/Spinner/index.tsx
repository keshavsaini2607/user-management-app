"use client";
import { CSSProperties } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const override: CSSProperties = {
   display: "block",
   margin: "0 auto",
   borderColor: "red",
};

function Spinner({ loading }: { loading: boolean }) {
   return (
      <div className="sweet-loading">
         <CircleLoader
            color={"#2B7FFF"}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
         />
      </div>
   );
}

export default Spinner;
