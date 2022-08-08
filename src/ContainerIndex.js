import * as xlsx from 'xlsx/xlsx.mjs';

function ContainerIndex() {
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("ingresando");
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };
    return (
        <div className="container-fluid">
            <h1 className="col-4 m-0 font-weight-bold text-primary p-3">Sube tu archivo</h1>
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo xlsx)</label>
                                        <input
                                            className='col form-control'
                                            type="file"
                                            name="upload"
                                            id="upload"
                                            onChange={readUploadFile}
                                        />
                                    </form>
                                </div>                                
                            </div>
                            <div className="card-body">
                                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                    CSS bloat and poor page performance. Custom CSS classes are used to create
                                    custom components and custom utility classes.</p>
                                <p className="mb-0">Before working with this theme, you should become familiar with the
                                    Bootstrap framework, especially the utility classes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ContainerIndex;