import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  ViewStyle,
  Image,
  ImageStyle,
  ActivityIndicator,
  SafeAreaView,
  DimensionValue,
} from "react-native";
import backgorundImage from "@/assets/images/default-cover-image.jpg";
import { useLocalSearchParams } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { CursusUser, ProfileType, ProjectUser, User } from "@/constants/types";
import SelectDropdown from "react-native-select-dropdown";
import DropdownIcon from "@/assets/icons/dropdown";
import React from "react";
import defaultProfileImage from "@/assets/images/default.png";
import LocationIcon from "@/assets/icons/location";
import CheckIcon from "@/assets/icons/validate";
import FailedIcon from "@/assets/icons/failed";
import profileQuery from "@/api/profileQuery";
import { StatusBar } from "expo-status-bar";

export function Space({ height }: { height: DimensionValue }) {
  return <View style={{ height: height, width: "100%" }}></View>;
}

function CursusSelectionDropDown({
  cursusList,
  selectedCursus,
  setSelectedCursus,
}: {
  cursusList: CursusUser[] | [];
  selectedCursus: CursusUser;
  setSelectedCursus: React.Dispatch<
    React.SetStateAction<CursusUser | undefined>
  >;
}) {
  return (
    <>
      <SelectDropdown
        data={cursusList.map((cursus: CursusUser) => {
          return { title: cursus.cursus.name };
        })}
        onSelect={(selectedItem, index) => {
          setSelectedCursus(cursusList[index]);
        }}
        renderButton={() => {
          return (
            <View
              style={{
                flex: 1,
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "flex-end",
                  fontWeight: 700,
                }}
              >
                {selectedCursus?.cursus?.name}
              </Text>
              <DropdownIcon
                style={{ position: "absolute", left: 110, top: 1 }}
              />
            </View>
          );
        }}
        renderItem={(item) => {
          return (
            <View
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color:
                    item.title === selectedCursus?.cursus?.name
                      ? Colors.tint
                      : Colors.black,
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
}

function Projects({
  projects,
  selectedCursus,
}: {
  projects: ProjectUser[] | [];
  selectedCursus: CursusUser;
}) {
  return (
    <>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: Colors.text,
          textTransform: "uppercase",
        }}
      >
        Projects
      </Text>
      <ScrollView
        style={{
          backgroundColor: Colors.text,
          borderRadius: 5,
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 5,
          height: 300,
        }}
      >
        {projects
          ?.filter((project: ProjectUser) => project.project.parent_id === null)
          .filter(
            (project: ProjectUser) =>
              project.cursus_ids[0] === selectedCursus?.cursus.id
          )
          .map((project: ProjectUser) => {
            return (
              <View
                key={project.id}
                style={{
                  width: "100%",
                  height: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>{project?.project.name}</Text>
                {project.status === "finished" && project["validated?"] ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckIcon color={"green"} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "green",
                        fontWeight: 700,
                      }}
                    >
                      {project.final_mark}
                    </Text>
                  </View>
                ) : project.status === "in_progress" ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "orange",
                        fontWeight: 700,
                      }}
                    >
                      In Progress{" "}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FailedIcon color={"red"} />
                    <Text
                      style={{ fontSize: 12, color: "red", fontWeight: 700 }}
                    >
                      {project.final_mark}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        <Space height={20} />
      </ScrollView>
    </>
  );
}

function Skills({ selectedCursus }: { selectedCursus: CursusUser }) {
  return (
    <>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: Colors.text,
          textTransform: "uppercase",
        }}
      >
        Skills
      </Text>
      <ScrollView
        style={{
          backgroundColor: Colors.text,
          borderRadius: 5,
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 5,
          flex: 1,
        }}
      >
        {selectedCursus &&
          selectedCursus.skills.map((skill) => {
            return (
              <View
                key={skill.id}
                style={{
                  width: "100%",
                  height: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12 }}>{skill.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 15,
                    width: 160,
                    borderColor: Colors.cyan,
                    borderWidth: 2,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.black,
                      fontWeight: 700,
                      position: "absolute",
                      right: 60,
                      zIndex: 1,
                    }}
                  >
                    {Number((skill.level / 20) * 100).toFixed(2)}%
                  </Text>
                  <View
                    style={{
                      height: 15,
                      width: `${(skill.level / 20) * 100}%`,
                      backgroundColor: Colors.cyan,
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
}

function ProfileInformation({
  profile,
  cursusList,
  selectedCursus,
  setSelectedCursus,
}: {
  profile: ProfileType;
  cursusList: CursusUser[] | [];
  selectedCursus: CursusUser;
  setSelectedCursus: React.Dispatch<
    React.SetStateAction<CursusUser | undefined>
  >;
}) {
  const [level, setLevel] = useState<{
    level: String;
    percentage: String;
  } | null>(null);

  useEffect(() => {
    if (!selectedCursus) {
      setLevel({
        level: "00",
        percentage: "00",
      });
    } else {
      setLevel({
        level:
          Number(selectedCursus?.level.toString().split(".")[0]) >= 10
            ? selectedCursus?.level.toString().split(".")[0]
            : 0 + selectedCursus?.level.toString().split(".")[0],
        percentage: selectedCursus?.level.toString().split(".")[1]
          ? selectedCursus?.level.toFixed(2).toString().split(".")[1]
          : "0",
      });
    }
  }, [selectedCursus]);

  return (
    <>
      <View
        style={{ flex: 1, alignItems: "center", gap: 10, position: "relative" }}
      >
        <Image
          source={
            profile?.image ? { uri: profile?.image } : defaultProfileImage
          }
          style={{ height: 120, width: 120, borderRadius: 120 }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: Colors.text, fontWeight: 700 }}>
            {profile?.fullName}
          </Text>
          <Text style={{ color: Colors.text, fontWeight: 500 }}>
            {profile?.login}
          </Text>
        </View>
      </View>
      <Space height={30} />
      <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
        <View
          style={{
            borderRadius: 5,
            paddingHorizontal: 30,
            paddingVertical: 8,
            backgroundColor: "rgba(255,255,255,0.2)",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: Colors.text, fontWeight: 500 }}>Wallet</Text>
          <Text style={{ color: Colors.text, fontWeight: 700 }}>
            {profile?.wallet} ₳
          </Text>
        </View>
        <View
          style={{
            borderRadius: 5,
            paddingHorizontal: 30,
            paddingVertical: 8,
            backgroundColor: "rgba(255,255,255,0.2)",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: Colors.text, fontWeight: 500 }}>
            Evaluation points
          </Text>
          <Text style={{ color: Colors.text, fontWeight: 700 }}>
            {profile?.correction_point}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 5,
            paddingHorizontal: 30,
            paddingVertical: 8,
            backgroundColor: "rgba(255,255,255,0.2)",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: Colors.text, fontWeight: 500 }}>Grade</Text>
          <Text style={{ color: Colors.text, fontWeight: 700 }}>
            {selectedCursus?.grade}{" "}
          </Text>
        </View>
        <View
          style={{
            position: "relative",
            borderRadius: 5,
            paddingHorizontal: 30,
            paddingVertical: 8,
            backgroundColor: "rgba(255,255,255,0.2)",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: Colors.text, fontWeight: 500 }}>Cursus</Text>
          {cursusList && (
            <CursusSelectionDropDown
              cursusList={cursusList}
              selectedCursus={selectedCursus}
              setSelectedCursus={setSelectedCursus}
            />
          )}
        </View>
      </View>
      <Space height={30} />
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
        <LocationIcon width={16} height={16} />
        <Text style={{ color: Colors.text, fontWeight: 700, fontSize: 15 }}>
          {profile?.city}
        </Text>
      </View>
      <View
        style={{
          gap: 5,
          height: 50,
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: Colors.text,
            width: 45,
          }}
        >
          {level?.level}
        </Text>
        <View style={{ flex: 1, width: "100%", gap: 2 }}>
          <Text style={{ fontSize: 12, fontWeight: 900, color: Colors.text }}>
            {level?.percentage}%
          </Text>
          <View
            style={{
              backgroundColor: "rgb(255,255,255)",
              height: 10,
              width: "100%",
              alignSelf: "flex-start",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <View
              style={
                {
                  flex: 1,
                  backgroundColor: "rgb(35, 90, 22)",
                  width: `${level?.percentage}%`,
                } as ViewStyle
              }
            ></View>
          </View>
        </View>
      </View>
    </>
  );
}

export default function Profile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedCursus, setSelectedCursus] = useState<CursusUser>();
  const [cursusList, setCursusList] = useState<CursusUser[] | []>([]);
  const [isLoading, profile] = profileQuery(id);

  useEffect(() => {
    if (profile) {
      setCursusList(profile.cursusList);
      setSelectedCursus(profile?.cursusList[profile.cursusList.length - 1]);
    }
  }, [profile]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Image source={backgorundImage} style={background} />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        {isLoading && !profile ? (
          <ActivityIndicator style={{ marginTop: 89 }} />
        ) : (
          profile && (
            <ScrollView style={container}>
              <ProfileInformation
                profile={profile!}
                cursusList={cursusList}
                selectedCursus={selectedCursus!}
                setSelectedCursus={setSelectedCursus}
              />
              <Space height={20} />
              <Projects
                projects={profile.projects}
                selectedCursus={selectedCursus!}
              />
              <Space height={20} />
              <Skills selectedCursus={selectedCursus!} />
              <Space height={20} />
            </ScrollView>
          )
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const container: ViewStyle = {
  flex: 1,
  width: "100%",
  padding: 10,
};

const background: ImageStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
  resizeMode: "cover",
  position: "absolute",
  zIndex: -1,
  top: 0,
};
