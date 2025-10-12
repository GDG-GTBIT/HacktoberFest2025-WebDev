import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator, image
import numpy as np
import os

train_path = "dataset/train"
test_path = "dataset/test"

train_datagen = ImageDataGenerator(rescale=1./255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True)
test_datagen = ImageDataGenerator(rescale=1./255)

train_set = train_datagen.flow_from_directory(train_path, target_size=(128, 128), batch_size=32, class_mode='categorical')
test_set = test_datagen.flow_from_directory(test_path, target_size=(128, 128), batch_size=32, class_mode='categorical')

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    MaxPooling2D(pool_size=(2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(pool_size=(2,2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(len(train_set.class_indices), activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_set, validation_data=test_set, epochs=10)
model.save("cattle_breed_model.h5")

img_path = input("Enter image path for prediction: ")
if os.path.exists(img_path):
    model = tf.keras.models.load_model("cattle_breed_model.h5")
    img = image.load_img(img_path, target_size=(128,128))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0) / 255.0
    pred = model.predict(x)
    breed_classes = list(train_set.class_indices.keys())
    print("Predicted Breed:", breed_classes[np.argmax(pred)])
else:
    print("Image not found!")
