import { useAppDispatch, useAppSelector } from "@/redux";
import dynamic from "next/dynamic";
import NotificationsSystem, {
  bootstrapTheme,
  dismissNotification,
  setUpNotifications,
} from "reapop";

setUpNotifications({
  defaultProps: {
    position: "top-right",
    showDismissButton: true,
    dismissible: true,
    dismissAfter: 5000,
  },
});

const ReapopNotification = () => {
  const dispatch = useAppDispatch();
  // 1. Retrieve the notifications to display.
  const notifications = useAppSelector((state) => state.notifications);

  return (
    <NotificationsSystem
      // 2. Pass the notifications you want Reapop to display.
      notifications={notifications}
      // 3. Pass the function used to dismiss a notification.
      dismissNotification={(id) => dispatch(dismissNotification(id))}
      // 4. Pass a builtIn theme or a custom theme.
      theme={bootstrapTheme}
    />
  );
};

export default dynamic(() => Promise.resolve(ReapopNotification), { ssr: false });
