import { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  rectangleCrops: {
    "padding": "56.25% 0",
    "top": 0,
  },
  squareCrops: {
    "top": 0,
  },
  img: {
    width: "100%",
    outline: "1px solid #cccccc",
  },
  input: {
    display: "none",
  },
  cropper: {
    height: 400,
    width: "100%"
  }
}));

export default function UpLoad(props) {
  const { image, setImage, square } = props
  const classes = useStyles();
  const uploadInputRef = useRef(null);
  const [cropper, setCropper] = useState();
  const [open, setOpen] = useState(false);
  const ratio = square ? 1 / 1 : 9 / 16

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    if (e.length != 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e[0]);
      handleClickOpen();
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImage(cropper.getCroppedCanvas().toDataURL());
    }
    handleClose();
  };
  console.log(square)

  

  return (
    <div>
      <div>
        {!image ? (
          !square ? (
            <DropzoneArea
              dropzoneClass={classes.rectangleCrops}
              showPreviewsInDropzone={false}
              acceptedFiles={['image/*']}
              dropzoneText={"サムネイルを選択"}
              filesLimit={1}
              onChange={(e) => onChange(e)}
            />
          ) : (
            <DropzoneArea
              dropzoneClass={classes.squareCrops}
              showPreviewsInDropzone={false}
              acceptedFiles={['image/*']}
              dropzoneText={"サムネイルを選択"}
              filesLimit={1}
              onChange={(e) => onChange(e)}
            />
          )
        ) : (
          <>
            <img
              className={classes.img}
              src={image}
              alt="cropped"
            />
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              className={classes.input}
              onChange={(e) => onChange(e.target.files)}
            />
            <Button
              onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
            >
              画像変更
            </Button>
            <Button
             onClick={() => handleClickOpen()}
            >
              サイズ変更
            </Button>
          </>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth='md'
        >
          <DialogContent>
            <Cropper
              className={classes.cropper}
              zoomTo={0.5}
              aspectRatio={ratio}
              src={image}
              responsive={true}
              onInitialized={(e) => {setCropper(e)}}
              guides={true}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              戻る
            </Button>
            <Button
              onClick={() => getCropData()}
              color="primary"
            >
              決定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
};