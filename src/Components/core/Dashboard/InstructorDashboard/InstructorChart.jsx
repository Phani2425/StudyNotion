import React,{useState} from 'react'
import {Chart, registerables} from 'chart.js'
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

  const [currChart, setcurrChart]  = useState('students');

  //function to generate  random colors
  //basically for chart we need to pass a array of colors which will be set as bg color of each section of the chart
  //so this function recives the no of colors i want and in a array it fills that no of colors and returns us
  const genRandomColor  = (noOfColor) => {
    const colorArr = [];
    for(let i=0;i<noOfColor;i++){
        colorArr.push(`rgb( ${Math.floor(Math.random() * 256)}  ${Math.floor(Math.random() * 256)}  ${Math.floor(Math.random() * 256)})`)
    }

    return colorArr;
  }

  //create data for chart displaying student info

  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
        {
            data: courses.map((course) => course.totalStudentsEnrolled),
            backgroundColor: genRandomColor(courses.length),
            
        }
    ]
  }

  //create data for chart displaying income info

  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName ),
    datasets: [
        {
            data: courses.map((course) => course.totalAmountGenerated),
            backgroundColor: genRandomColor(courses.length),
        }
    ]
  }

  //create options

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setcurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setcurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart