FROM runmymind/docker-android-sdk

CMD ["/bin/bash", "-c", "cd /mobile && rm -f /mobile/app/build/outputs/apk/release/*.apk && ./gradlew assembleRelease && cp /mobile/app/build/outputs/apk/release/*.apk /build/client.apk && rm -rf /mobile/app/build/"]