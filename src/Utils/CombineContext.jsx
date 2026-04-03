const CombineContext = (...providers) => {
  return ({ children }) =>
    providers.reduceRight(
      (accumulator, CurrentProvider) => (
        <CurrentProvider>{accumulator}</CurrentProvider>
      ),
      children
    );
};

export default CombineContext;
