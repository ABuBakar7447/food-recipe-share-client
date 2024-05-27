import { Link } from "react-router-dom";

const DevDetails = () => {
  return (
    <div className="mx-auto w-4/5 my-16">
      <p className="text-4xl font-bold underline text-yellow-600 text-center my-10">
        Developer Details
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="text-2xl font-bold underline text-yellow-600">Skills</p>
          <p>
            Language: JavaScript, Typescript, HTML, CSS <br />
            Libraries/Framework:React, Redux, Redux Toolkit, Next JS, Bootstrap,
            Tailwind, Tanstack <br />
            Query Server-side: Node Js, Express Js Database: MongoDB, Firebase{" "}
            <br />
            Hosting: Vercel, Netlify Tools: GitHub, VS Code, Crome Devtool
          </p>

          <p className="text-2xl font-bold underline text-yellow-600 mt-10">
            Educational Background
          </p>
          <p>
            BSc in Computer Science and Engineering in Daffodil International
            University, Dhaka <br />
            April, 2020 – June, 2024 <br />
            CGPA: 3.79/4.00 (Until 11 semester)
          </p>

          <p className="text-2xl font-bold underline text-yellow-600 mt-10">
            Technology Used
          </p>
          <p>
            Front-End: Javascript, VITE, React, Tailwind CSS, Daisy UI, Tanstack
            Query, React Hook Form, Firebase, ANT design,
            <br />
            Backend: Node, Express, Mongodb, CORS, JWT
          </p>
        </div>
        <div>
          <Link to='https://drive.google.com/file/d/1lYNoykftTRmPCAwAyu3QDfXkMSQQCDje/view?usp=sharing' target="blank">
            <img src="https://i.ibb.co/GTbf2MD/sfsaf.png" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DevDetails;
