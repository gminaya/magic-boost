import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import 'styles/components/dropPhotoZone.scss';

interface TargetBoxProps {
  onDrop: (item: { files: File[] }) => void;
}
export const DropPhotoZone = (props:TargetBoxProps ) => {
  const { onDrop } = props;
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: File[] }) {
        if (onDrop) {
          onDrop(item);
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [props.onDrop],
  );

  const isActive = canDrop && isOver;
  return (
    <div ref={drop} className={ isActive ? 'drop-container onDrag' : 'drop-container' }>
      <div className="icon">
        {isActive ? <DownloadOutlined /> : <InboxOutlined />}    
      </div>
      {isActive ? 'Release to upload' : 'Click or drag photo to upload'}
    </div>
  );
};