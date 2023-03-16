type DetailContainerType = {
  property: string;
  value: string;
};

export default function DetailContainer({
  property,
  value,
}: DetailContainerType) {
  return (
    <>
      <div id="photo_container" className="grid grid-cols-2 py-8 md:py-6">
        <span className="font-primary text-[#828282] text-sm">{`${property.toUpperCase()}`}</span>
        <span className="font-primary text-[#333] text-base justify-self-start">
          {value.length > 35 ? `${value.slice(0, 35)}...` : value}
        </span>
      </div>
      <hr />
    </>
  );
}
