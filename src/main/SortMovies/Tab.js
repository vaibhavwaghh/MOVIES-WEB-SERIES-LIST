function Tab({ name, num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      {name}
    </button>
  );
}
export default Tab;
