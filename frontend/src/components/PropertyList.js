// frontend/src/components/PropertyList.js
import React, { useState, useEffect } from "react";
import { getProperties } from "../services/api";
import Pagination from "./Pagination";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await getProperties(currentPage);
      setProperties(data.properties);
      setTotalPages(data.totalPages);
    };

    fetchProperties();
  }, [currentPage]);

  return (
    <div>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>{property.place}</li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PropertyList;
