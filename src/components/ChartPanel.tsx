interface ChartPanelProps {
  title: string;
  size: 'main' | 'small' | 'wide';
  children: React.ReactNode;
}

const ChartPanel = ({ title, size, children }: ChartPanelProps) => {
  const panelClasses = {
    main: 'md:col-span-3 h-[500px]',
    small: 'h-[200px]',
    wide: 'md:col-span-2 h-[300px]'
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">{title}</h2>
      <div className={`relative w-full ${panelClasses[size]} flex items-center justify-center`}>
        <div className="w-[95%] h-[95%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChartPanel;