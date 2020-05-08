import React from "react";
import { Badge } from "antd";

import Widget from "components/Widget/index";
import { Link } from "react-router-dom";

const BuildingCard = ({ title, text, img, noBadge, link, classes }) => {
  const Parent = ({ children, ...props }) =>
    link ? (
      <a href={link} {...props}>
        {children}
      </a>
    ) : (
      <div {...props}>{children}</div>
    );

  return (
    <Widget styleName={`gx-card-full gx-dot-arrow-hover ${classes}`}>
      <Parent className="gx-media gx-align-items-center gx-flex-nowrap">
        <>
          <div className="gx-px-3 gx-build-box-lay">
            <img alt="..." src={img} className="" />
          </div>
          <div className="gx-media-body gx-py-3 gx-pr-4 gx-build-box-lay-content">
            {!noBadge && (
              <Badge
                className="gx-badge-radius-sm gx-mb-2"
                count="34 New"
                style={{ backgroundColor: "#52c41a" }}
              />
            )}
            <h2 className="h4 gx-text-truncate gx-mb-1">{title}</h2>

            <p className="gx-mb-0 gx-text-grey gx-fs-sm">{text}</p>
            <div className="gx-dot-arrow">
              <div className="gx-bg-primary gx-hover-arrow">
                <i className="icon icon-long-arrow-right gx-text-white" />
              </div>
              <div className="gx-dot">
                <i className="icon icon-ellipse-v gx-text-primary" />
              </div>
            </div>
          </div>
        </>
      </Parent>
    </Widget>
  );
};

export default BuildingCard;
