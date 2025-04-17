import React, { useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const questions = [
  {
    category: "Organization",
    items: [
      "Ownership Structure",
      "Physical Layout/Condition",
      "Outside Conflicts",
      "Delegation Effectiveness",
      "Employee Focus",
      "Policies",
      "Manuals",
      "Departmental Standards",
      "Office Procedures",
      "Time Efficiency/Productivity",
      "Tactical Planning",
      "Strategic Planning",
      "Forecasting",
      "Goal Setting/Tracking",
      "Execution/Follow-Through",
      "Statistical Reports"
    ]
  },
  {
    category: "Finance",
    items: [
      "Cash Control",
      "Billing Procedures",
      "Credit & Collection Policy",
      "Status Of Liabilities",
      "Debt Load",
      "Working Capital Availability",
      "General Accounting Procedures",
      "Cost Accounting",
      "Job Costing",
      "Expense Controls",
      "Inventory Control",
      "Purchasing Methods",
      "Auditing",
      "Profit Trend",
      "Breakeven Position",
      "Department Info Flow",
      "Reports to Management"
    ]
  },
  {
    category: "Personnel",
    items: [
      "Training",
      "Turnover",
      "Employee Morale",
      "Employee Career Guidance",
      "Employee Evaluation System",
      "Promotion Policy",
      "Raise Policy",
      "Incentives",
      "Management Compensation"
    ]
  }
];

export default function OperationalEvaluationQuiz() {
  const [answers, setAnswers] = useState({});

  const handleSliderChange = (item, value) => {
    setAnswers({ ...answers, [item]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Operational Evaluation Results", 20, 20);
    doc.setFontSize(12);
    let y = 30;
    questions.forEach((section) => {
      doc.text(`${section.category}`, 20, y);
      y += 6;
      section.items.forEach((item) => {
        const score = answers[item] || 0;
        doc.text(`- ${item}: ${score}%`, 30, y);
        y += 6;
      });
      y += 4;
    });
    doc.save("Operational_Evaluation_Results.pdf");
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Operational Evaluation Quiz</h1>
      {questions.map((section) => (
        <div key={section.category} className="mt-4 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{section.category}</h2>
          {section.items.map((item) => (
            <div key={item} className="mb-4">
              <label className="block font-medium">{item}</label>
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                value={answers[item] || 50}
                onChange={(e) => handleSliderChange(item, parseInt(e.target.value))}
              />
              <div>{answers[item] || 50}%</div>
            </div>
          ))}
        </div>
      ))}
      <div className="text-center">
        <button
          onClick={generatePDF}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Download Results
        </button>
      </div>
    </div>
  );
}
