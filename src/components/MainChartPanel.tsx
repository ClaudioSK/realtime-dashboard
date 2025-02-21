interface MainChartPanelProps {
  title: string;
  children: React.ReactNode;
}

const MainChartPanel = ({ title, children }: MainChartPanelProps) => {
  return (
    <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">{title}</h2>
      <div className="relative w-full h-[600px] flex items-center justify-center p-4">
        <div className="w-[80%] h-[80%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainChartPanel;