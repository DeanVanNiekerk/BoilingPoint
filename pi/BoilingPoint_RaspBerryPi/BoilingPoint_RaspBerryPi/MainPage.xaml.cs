using BoilingPoint_RaspBerryPi.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Data.Json;
using Windows.Devices.Gpio;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Windows.Storage.Streams;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.Web;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace BoilingPoint_RaspBerryPi
{
    public sealed partial class MainPage : Page
    {
        private const int LED_PIN = 47;
        private GpioPin pin;
        private GpioPinValue pinValue;

        private DispatcherTimer timer;

        private SolidColorBrush redBrush = new SolidColorBrush(Windows.UI.Colors.Red);
        private SolidColorBrush grayBrush = new SolidColorBrush(Windows.UI.Colors.LightGray);

        private MessageWebSocket _msgWebSocket = new MessageWebSocket();

        //new Uri("ws://boilingpoint.azurewebsites.net:8001", UriKind.Absolute);
        //new Uri("ws://finetent.dedicated.co.za:8001", UriKind.Absolute);
        private readonly Uri echoService = new Uri("ws://finetent.dedicated.co.za:8001", UriKind.Absolute);
        //private readonly Uri echoService = new Uri("ws://firefly:8001", UriKind.Absolute);
        private string read = "";
        private bool activated;
        private string status = "";

        public MainPage()
        {
            InitializeComponent();

            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(5000);
            timer.Tick += Timer_Tick1;

            InitGPIO();

            if (pin != null)
            {
                Connect();
                timer.Start();
            }
        }

        private void Reconnect(IWebSocket sender, WebSocketClosedEventArgs args)
        {
            Connect();
        }

        private void Timer_Tick1(object sender, object e)
        {
            if (activated)
            {
                LED.Fill = redBrush;
            }
            else
            {
                LED.Fill = grayBrush;
            }

            SendStatus(DateTime.Now.ToString());
            GpioStatus.Text = read;
            if (status != "")
            {
                GpioStatus.Text = status;
            }
        }

        private void MessageReceived(MessageWebSocket sender, MessageWebSocketMessageReceivedEventArgs args)
        {
            try
            {
                using (DataReader reader = args.GetDataReader())
                {
                    reader.UnicodeEncoding = Windows.Storage.Streams.UnicodeEncoding.Utf8;
                    read = reader.ReadString(reader.UnconsumedBufferLength);
                    JsonObject json = JsonObject.Parse(read);
                    MapMessageToDTO(json);
                }
            }
            catch (Exception ex) // For debugging
            {
                WebErrorStatus status = WebSocketError.GetStatus(ex.GetBaseException().HResult);
                // Add your specific error-handling code here.
            }
        }

        private IKettleDTO MapMessageToDTO(JsonObject message)
        {
            IKettleDTO test = null;
            int type = (int)(message["Type"].GetNumber());
            JsonObject data = message["Data"].GetObject();

            switch (type)
            {
                case 2:
                    {
                        test = new ActivateDTO { Type = 2, Activate = data["Activate"].GetBoolean() };
                        SetLED(((ActivateDTO)(test)).Activate);
                        break;
                    };
                default:
                    break;
            }

            return test;
        }

        private void SetLED(bool value)
        {
            if (value)
            {
                pinValue = GpioPinValue.High;
                activated = true;
            }
            else
            {
                pinValue = GpioPinValue.Low;
                activated = false;
            }

            pin.Write(pinValue);
            pin.SetDriveMode(GpioPinDriveMode.Output);
        }

        private void InitGPIO()
        {
            var gpio = GpioController.GetDefault();

            // Show an error if there is no GPIO controller
            if (gpio == null)
            {
                pin = null;
                GpioStatus.Text = "There is no GPIO controller on this device.";
                return;
            }

            pin = gpio.OpenPin(LED_PIN);
            pinValue = GpioPinValue.High;
            pin.Write(pinValue);
            pin.SetDriveMode(GpioPinDriveMode.Output);

            GpioStatus.Text = "GPIO pin initialized correctly.";

        }

        private async void Connect()
        {
            try
            {
                _msgWebSocket.Dispose();
                _msgWebSocket = new MessageWebSocket();

                _msgWebSocket.MessageReceived += MessageReceived;
                _msgWebSocket.Closed += Reconnect;

                _msgWebSocket.Control.MessageType = SocketMessageType.Utf8;
                await _msgWebSocket.ConnectAsync(echoService);
            }
            catch (Exception e)
            {
                status = e.Message;
            }

        }

        private async void SendStatus(string test)
        {
            try
            {
                var _msgWriter = new DataWriter(_msgWebSocket.OutputStream);
                _msgWriter.UnicodeEncoding = UnicodeEncoding.Utf8;

                var packet = "{\"Type\":\"2\",\"Data\":{\"On\":\"true\",\"Temp\":\"35\",\"Level\":\"50%\"}}";
                _msgWriter.WriteString(packet);

                var result = await _msgWriter.StoreAsync();
                //GpioStatus.Text = result.ToString();
            }
            catch (Exception e)
            {
                GpioStatus.Text = e.Message;
                Connect();
            }

        }

    }
}
