import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../utils/apiRoutes";
import axios from "axios";
import { useFormik } from "formik";
import { convertDateFormatForUI } from "../utils/convertDateFormatForUI";

function useFetchJobDetails(params, checked, selectedYear, setSelectedRegNo) {
  const { updateJobAPI, getJobAPI } = apiRoutes(params.importer, params.jobNo);
  const [data, setData] = useState(null);
  const [detentionFrom, setDetentionFrom] = useState([]);
  const [actualWeight, setActualWeight] = useState();
  const [weightShortage, setWeightShortage] = useState();
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    async function getJobDetails() {
      const response = await axios.get(
        `${getJobAPI}/job/${selectedYear}/${params.jobNo}`
      );
      setData(response.data);
    }

    getJobDetails();
  }, [params.importer, params.jobNo, getJobAPI, selectedYear]);

  // Formik
  const formik = useFormik({
    initialValues: {
      container_nos: "",
      eta: "",
      discharge_date: "",
      status: "",
      detailed_status: "",
      free_time: "",
      arrival_date: "",
      do_validity: "",
      checklist: "",
      remarks: "",
      description: "",
      sims_reg_no: "",
      pims_reg_no: "",
      nfmims_reg_no: "",
      sims_date: "",
      pims_date: "",
      nfmims_date: "",
      delivery_date: "",
      discharge_date: "",
      assessment_date: "",
      examination_date: "",
      duty_paid_date: "",
      out_of_charge_date: "",
      physical_weight: "",
      tare_weight: "",
      container_images: "",
      weighment_slip_images: "",
    },

    onSubmit: async (values) => {
      const res = await axios.put(
        `${updateJobAPI}/updatejob/${selectedYear}/${params.jobNo}`,
        {
          eta: values.eta,
          checked,
          free_time: values.free_time,
          status: values.status,
          detailed_status: values.detailed_status,
          container_nos: values.container_nos,
          arrival_date: values.arrival_date,
          do_validity: values.do_validity,
          checklist: values.checklist,
          remarks: values.remarks,
          description: values.description,
          sims_reg_no: values.sims_reg_no,
          pims_reg_no: values.pims_reg_no,
          nfmims_reg_no: values.nfmims_reg_no,
          sims_date: values.sims_date,
          pims_date: values.pims_date,
          nfmims_date: values.nfmims_date,
          delivery_date: values.delivery_date,
          discharge_date: values.discharge_date,
          assessment_date: values.assessment_date,
          examination_date: values.examination_date,
          duty_paid_date: values.duty_paid_date,
          out_of_charge_date: values.out_of_charge_date,
          physical_weight: values.physical_weight,
          tare_weight: values.tare_weight,
        }
      );
      console.log(res);

      navigate(`/${params.importer}/jobs/pending`);
    },
  });

  // Update formik intial values when data is fetched from db
  useEffect(() => {
    if (data) {
      setSelectedRegNo(
        data.sims_reg_no
          ? "sims"
          : data.pims_reg_no
          ? "pims"
          : data.nfmims_reg_no
          ? "nfmims"
          : ""
      );
      const container_nos = data.container_nos.map((container) => ({
        arrival_date:
          container.arrival_date === undefined
            ? ""
            : convertDateFormatForUI(container.arrival_date), // convert date to yyyy-mm-dd
        container_number: container.container_number,
        size: container.size === undefined ? "20" : container.size,
        container_images:
          container.container_images === undefined
            ? []
            : container.container_images,
        weighment_slip_images:
          container.weighment_slip_images === undefined
            ? []
            : container.weighment_slip_images,
      }));

      formik.setValues({
        ...{ container_nos },
        arrival_date: container_nos[0].arrival_date,
        eta: data.eta === undefined ? "" : convertDateFormatForUI(data.eta),
        free_time: data.free_time === undefined ? 14 : data.free_time,
        status: data.status,
        detailed_status:
          data.detailed_status === undefined
            ? "Estimated Time of Arrival"
            : data.detailed_status,
        do_validity:
          data.do_validity === undefined
            ? ""
            : convertDateFormatForUI(data.do_validity),
        checklist: data.checklist === undefined ? "" : data.checklist,
        remarks: data.remarks === undefined ? "" : data.remarks,
        description: data.description === undefined ? "" : data.description,
        sims_reg_no:
          data.sims_reg_no === undefined ? "" : data.sims_reg_no.split("-")[1],
        pims_reg_no:
          data.pims_reg_no === undefined ? "" : data.pims_reg_no.split("-")[3],
        nfmims_reg_no:
          data.nfmims_reg_no === undefined
            ? ""
            : data.nfmims_reg_no.split("-")[1],
        sims_date: data.sims_date === undefined ? "" : data.sims_date,
        pims_date: data.pims_date === undefined ? "" : data.pims_date,
        nfmims_date: data.nfmims_date === undefined ? "" : data.nfmims_date,
        delivery_date:
          data.delivery_date === undefined ? "" : data.delivery_date,
        discharge_date:
          data.discharge_date === undefined ? "" : data.discharge_date,
        assessment_date:
          data.assessment_date === undefined ? "" : data.assessment_date,
        examination_date:
          data.examination_date === undefined ? "" : data.examination_date,
        duty_paid_date:
          data.duty_paid_date === undefined ? "" : data.duty_paid_date,
        out_of_charge_date:
          data.out_of_charge_date === undefined ? "" : data.out_of_charge_date,
        physical_weight:
          data.physical_weight === undefined ? "" : data.physical_weight,
        tare_weight: data.tare_weight === undefined ? "" : data.tare_weight,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  // Update detention-from date
  useEffect(() => {
    function addDaysToDate(dateString, days) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + days);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    }

    if (formik.values.container_nos !== "" && data !== null) {
      // If all containers do not arrive at the same time, use the arrival date of individual container
      if (!checked) {
        const updatedDate = formik.values.container_nos.map((container) =>
          addDaysToDate(
            container.arrival_date,
            parseInt(formik.values.free_time)
          )
            .split("-")
            .reverse()
            .join("-")
        );
        setDetentionFrom(updatedDate);
      } else {
        // If all containers arrive at the same time, use the common arrival date
        const updatedDate = formik.values.container_nos.map((container) =>
          addDaysToDate(
            formik.values.arrival_date,
            parseInt(formik.values.free_time)
          )
            .split("-")
            .reverse()
            .join("-")
        );
        setDetentionFrom(updatedDate);
      }
    }
    // eslint-disable-next-line
  }, [
    formik.values.arrival_date,
    formik.values.free_time,
    formik.values.container_nos,
    data,
    checked,
  ]);

  // Update actual weight
  useEffect(() => {
    if (
      formik.values.physical_weight !== "" &&
      formik.values.tare_weight !== ""
    ) {
      setActualWeight(
        parseInt(formik.values.physical_weight) -
          parseInt(formik.values.tare_weight)
      );
    }
  }, [formik.values.physical_weight, formik.values.tare_weight]);

  // Update weight shortage
  useEffect(() => {
    if (
      formik.values.physical_weight !== "" &&
      formik.values.tare_weight !== "" &&
      data !== null
    ) {
      setWeightShortage(
        parseInt(parseInt(data.gross_weight.replace(/,/g, ""))) -
          (parseInt(formik.values.physical_weight) -
            parseInt(formik.values.tare_weight))
      );
    }
  }, [data, formik.values.physical_weight, formik.values.tare_weight]);

  return { data, detentionFrom, actualWeight, weightShortage, formik };
}

export default useFetchJobDetails;
