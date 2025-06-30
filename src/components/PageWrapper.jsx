const PageWrapper = ({ children }) => {
  return (
    <div
      className="p-4"
      style={{
        borderRadius: '20px',
        backgroundColor: 'rgba(69, 123, 157, 0.8)',
        minHeight: '100vh',
        marginLeft: '5px', // match collapsed sidebar width
        transition: 'margin-left 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
