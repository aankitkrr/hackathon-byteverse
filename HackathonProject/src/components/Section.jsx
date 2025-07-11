const Section = ({ title, children }) => {
  return (
    <section className="mb-10">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-blue-500 dark:text-blue-400">
          {title}
        </h2>
      )}
      <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default Section;
