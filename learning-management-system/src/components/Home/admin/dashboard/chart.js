import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Registering all necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);

export const LineChart = ({views=[]}) => {
    const labels = getLastYearMonths();
    const options = {
        responsive: true,
        plugins: {
            legend: { // corrected 'Legend' to 'legend'
                position: "bottom",
            },
            title: { // corrected 'Title' to 'title'
                display: true,
                text: "Yearly Views",
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Views",
                data: views,
                borderColor: "rgba(107, 70, 193, 0.5)",
                backgroundColor: "#6b46c1" // corrected 'background' to 'backgroundColor'
            }
        ]
    };

    return (
        <div>
            <Line options={options} data={data} /> {/* corrected 'LineChart' to 'Line' */}
        </div>
    );
};

export const DoughnutChart = ({users=[]}) => {
    const data = {
        labels: ["Subscribed", "Not Subscribed"],
        datasets: [
            {
                label: "Subscription Status",
                data:users,
                borderColor: ['rgba(62,12,171)', "rgba(214,43,129)"],
                backgroundColor: ['rgba(62,12,171,0.3)', "rgba(214,43,129,0.3)"],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Subscription Status',
            },
        },
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
};

function getLastYearMonths(){
    const labels=[];

    const months=[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Augest',
        'September',
        'October',
        'November',
        'December'
    ];
    const currentMonth = new Date().getMonth();
    console.log(currentMonth);
    const remain = 11-currentMonth;
    for(let i = currentMonth;i< months.length;i--){
        const element = months[i];
        labels.unshift(element);
        if(i===0)break;
    }
    for(let i = 11;i>remain;i--){
        const element = months[i];
        labels.unshift(element);
        if(i===currentMonth)break;
    }
    return labels;
}   
getLastYearMonths();
