const Section = ({ title, children }) => {
  return (
    <section className="mb-10 px-4 sm:px-6 lg:px-8">
      {title && (
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          {title}
        </h2>
      )}
      <div className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default Section;
