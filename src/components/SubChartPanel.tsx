interface SubChartPanelProps {
  title: string;
  isWide?: boolean;
  children: React.ReactNode;
}

const SubChartPanel = ({ title, isWide = false, children }: SubChartPanelProps) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${isWide ? 'md:col-span-2' : ''}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">{title}</h2>
      <div className={`relative w-full ${isWide ? 'h-[300px]' : 'h-[200px]'} flex items-center justify-center`}>
        <div className="w-[95%] h-[95%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubChartPanel;