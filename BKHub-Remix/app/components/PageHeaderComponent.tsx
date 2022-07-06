import * as React from "react";
import {Link} from "remix"

interface myProps {
  pageName: String,
}


const PageHeaderComponent: React.FC<myProps> = (props: myProps) => {
    return (
      <h1 className="text-3xl font-bold">
      <Link to=".">{props.pageName}</Link>
  </h1>
)
    }

export default PageHeaderComponent;